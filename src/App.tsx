import { ReactNode, useEffect } from "react";
import { useCheckLoginQuery } from "./services/auth.service";
import {
  connect,
  isConnected,
  stompClient,
} from "./websocket/websocket-config";
import { Message } from "stompjs";
import { pageQueryHanlder } from "./utils/query-handler";
import { useGetRoomQuery } from "./services/room.service";
import { useLazyGetMessageQuery } from "./services/message.service";
import { useGetNotificationsQuery } from "./services/notification.service";
import { useGetCartByUserIdQuery } from "./services/cart.service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./rtk/store/store";
import { setConnected, setDisConnected } from "./rtk/slice/socket-slice";

const App = ({ children }: { children: ReactNode }) => {
  const { data, isSuccess } = useCheckLoginQuery();
  const { connected } = useSelector((state: RootState) => state.socket);
  const dispatch = useDispatch();


  const paramsRoom = pageQueryHanlder(1, 100);
  const paramsMessage = pageQueryHanlder(1, 1000);
  const paramNotification = pageQueryHanlder(1, 40);

  const { data: user, isSuccess: loginSuccess } = useCheckLoginQuery();
  const { data: room, refetch: refetchRoom } = useGetRoomQuery(
    {
      email: user?.data?.email || "",
      param: paramsRoom,
    },
    { skip: !loginSuccess || !user?.data?.id }
  );
  const [trigger] = useLazyGetMessageQuery();
  const { refetch } = useGetCartByUserIdQuery(user?.data?.id || "", {
    skip: !loginSuccess || !user?.data?.id,
  });
  const { refetch: notificationRefetch } = useGetNotificationsQuery(
    {
      id: user?.data?.id || "",
      param: paramNotification,
    },
    { skip: !user?.data }
  );

  useEffect(() => {
    if (isSuccess && !connected) {
      if (data.data) {
        connect(onConnected, onError);
        dispatch(setConnected());
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, connected]);

  const onConnected = () => {
    if (isConnected() && stompClient) {
      stompClient.subscribe(
        `/user/${data?.data?.email}/queue/messages`,
        onMessageReceived
      );
      stompClient.subscribe(
        `/topic/notification/${data?.data?.id}`,
        onNotification
      );
    }
  };

  const onMessageReceived = (message: Message) => {
    const messageResponse = JSON.parse(message.body);
    console.log(messageResponse);
    if ("type" in messageResponse) {
      if (messageResponse.type === "cart") {
        refetch();
      }
    }

    if (room && room?.data.items.length > 0) {
      trigger({
        roomId: room?.data?.items?.[0]?.conversationId || "",
        params: paramsMessage,
      });
    }
    refetchRoom();
  };

  const onNotification = (notification: Message) => {
    const notificationResponse = JSON.parse(notification.body);
    console.log(notificationResponse);
    notificationRefetch();
  };

  const onError = () => {
    console.log("Error connecting to websocket server");
    dispatch(setDisConnected());
  };

  return children;
};

export default App;
