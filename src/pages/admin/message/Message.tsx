import { useCheckLoginQuery } from "../../../services/auth.service";
import {
  useGetRoomQuery,
  useUpdateRoomMutation,
} from "../../../services/room.service";
import { pageQueryHanlder } from "../../../utils/query-handler";
import { useEffect, useState } from "react";
import "./message.scss";
import { useLazyGetMessageQuery } from "../../../services/message.service";
import ViewContent from "./ViewContent";
import moment from "moment";
import RoomList from "./RoomList ";
import { isMobile } from "../../../utils/responsive";
import { Message as MessageModel } from "../../../models/message";

function Message() {
  const mobile = isMobile();
  const [hiddenMobile, setHiddenMobile] = useState<boolean>(false);
  const [roomActive, setRoomActive] = useState<string>("");

  const { data: user, isSuccess: loginSuccess } = useCheckLoginQuery();
  const userCurrent = user?.data?.email;
  const paramsRoom = pageQueryHanlder(1, 100);
  const {
    data: room,
    isSuccess: roomSuccess,
    refetch: refetchRoom,
  } = useGetRoomQuery(
    {
      email: user?.data?.email || "",
      param: paramsRoom,
    },
    { skip: !loginSuccess || !user?.data?.id }
  );
  const rooms = room?.data.items?.map((room) => {
    return {
      ...room,
      sendDate: moment(room.sendDate, "YYYY-MM-DD HH:mm:ss").toDate(), // Chuyển đổi thành Date
    };
  });
  const handleBack = () => {
    setHiddenMobile(false);
  };
  // Sắp xếp tăng dần theo thời gian gần nhất
  const sortedRooms = rooms
    ?.filter((room) => room.sendDate) // Lọc bỏ phần tử không có sendDate
    .sort((a, b) => {
      const timeA = moment(a.sendDate); // Đọc sendDate dạng ISO
      const timeB = moment(b.sendDate);

      return timeB.diff(timeA); // Sắp xếp giảm dần theo thời gian
    });

  const paramsMessage = pageQueryHanlder(1, 1000);
  const [trigger, { isSuccess }] = useLazyGetMessageQuery();
  const [msg, setMsg] = useState<MessageModel[]>([]);

  useEffect(() => {
   const fetch = async()=>{
    if (room && room?.data.items?.length > 0) {
        const dataMessages = await trigger({
          roomId: roomActive || "",
          params: paramsMessage,
        }).unwrap();
        setMsg(dataMessages.data.items || []);
      }
   }
   fetch();
  }, [room?.data.items, paramsMessage]);

  const [updateRoom] = useUpdateRoomMutation();
  const handleUpdateRoom = async (id: string, count: number) => {
    if (count === 0) {
      return;
    }
    try {
      await updateRoom(id);
      refetchRoom();
    } catch (error) {
      console.log(error);
    }
  };
  const handleActive = (id: string) => {
    setRoomActive(id);
    setHiddenMobile(true);
  };

  useEffect(() => {
    if (roomSuccess && room?.data.items.length) {
      trigger({
        roomId: room?.data?.items?.[0]?.conversationId || "",
        params: paramsMessage,
      });
    }
  }, [roomActive]);
  useEffect(() => {
    if (isSuccess) {
      trigger({
        roomId: room?.data?.items?.[0]?.conversationId || "",
        params: paramsMessage,
      });
    }
  }, [msg, isSuccess]);
  return (
    <div className=" bg-light p-4 " style={{ height: "100%" }}>
      <h6>Danh sách tin nhắn</h6>
      <div
        className="row bg-white "
        style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
      >
        {(!mobile || !hiddenMobile) && (
          <div className={`${mobile ? "col-12" : "col-3"} border-end`}>
            <RoomList
              sortedRooms={sortedRooms}
              handleActive={handleActive}
              handleUpdateRoom={handleUpdateRoom}
            />
          </div>
        )}

        {mobile ? (
          hiddenMobile && (
            <div className="col-12">
              {roomActive !== "" ? (
                <ViewContent
                  messagesData={msg|| []}
                  userCurrent={userCurrent || ""}
                  refetch={()=>{}}
                  refetchRoom={refetchRoom}
                  handleBack={handleBack}
                />
              ) : (
                <div className="d-flex justify-content-center align-items-center mt-3">
                  <img src="" alt="" />
                </div>
              )}
            </div>
          )
        ) : (
          <div className="col-9">
            {roomActive !== "" ? (
              <ViewContent
                messagesData={msg || []}
                userCurrent={userCurrent || ""}
                refetch={()=>{}}
                refetchRoom={refetchRoom}
                handleBack={handleBack}
              />
            ) : (
              <div className="d-flex justify-content-center align-items-center mt-3">
                <img src="" alt="" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;
