import { ReactNode, useEffect, useState } from "react";
import { useCheckLoginQuery } from "./services/auth.service";
import { connect, isConnected, stompClient } from "./websocket/websocket-config";
import { Message } from "stompjs";
import { pageQueryHanlder } from "./utils/query-handler";
import { useGetRoomQuery } from "./services/room.service";
import { useGetMessageQuery } from "./services/message.service";
import { useGetCommentsQuery } from "./services/comment.service";

const App = ({ children }: { children: ReactNode }) => {
    const {data, isSuccess} = useCheckLoginQuery();
    const [connectFinish, setConnectFinish] = useState<boolean>(false);
    // message
    const { data: user, isSuccess: loginSuccess } = useCheckLoginQuery();
    const paramsRoom = pageQueryHanlder(1, 100);
    const { data: room, isSuccess: roomSuccess } = useGetRoomQuery({
        email: user?.data?.email || '',
        param: paramsRoom,
    }, { skip: !loginSuccess || !user?.data?.id })
    const paramsMessage = pageQueryHanlder(1, 1000);
    const { data: messagesData, refetch } = useGetMessageQuery({
        roomId: room?.data?.items?.[0]?.conversationId || '',
        params: paramsMessage,
    }, { skip: !roomSuccess });
    ///

    //////Comment
    const param = pageQueryHanlder(1, 10);
    const { data: dataComment, refetch: refetchComment } = useGetCommentsQuery({
        productId: '670b3306754821709ebdbcdc',
        params: param
    });
    ///////////
console.log(dataComment)
    useEffect(() => {
        if(isSuccess) {
            if(data.data) {
                connect(onConnected, onError);
            } else {
                setConnectFinish(true);
            }
        } else {
            setConnectFinish(true);
        }
    }, [isSuccess]);

    const onConnected = () => {
        console.log("Connected to websocket server");
        if (isConnected() && stompClient) {
            stompClient.subscribe("/user/" + data?.data?.email + "/queue/messages", onMessageReceived);
        }
        setConnectFinish(true);
    }

    const onMessageReceived = (message: Message) => {
        const messageResponse = JSON.parse(message.body);
        console.log(messageResponse);
        refetch();
    }


    const onError = () => {
        console.log("Error connecting to websocket server");
    }

    return connectFinish ? children : <></>;
}

export default App;