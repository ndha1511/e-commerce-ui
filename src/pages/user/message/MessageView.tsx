import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from "react";
import "./message.scss";
import SimpleBar from "simplebar-react";
import { pageQueryHanlder } from "../../../utils/query-handler";
import { useGetRoomQuery } from "../../../services/room.service";
import { useCheckLoginQuery } from "../../../services/auth.service";
import {
  useCreateMessageMutation,
  useLazyGetMessageQuery,
} from "../../../services/message.service";
import MessageContent from "./MessageContent";
import { Message, MessageStatus, MessageType } from "../../../models/message";
import moment from "moment";
import LoginMessage from "./LoginMessage.";
export interface MessageProps {
  id: number;
  text: string;
  sender: string;
  messageType: MessageType;
  messageStatus: MessageStatus;
  timestamp: string;
}

const MessageView: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");
  const { data: user, isSuccess: loginSuccess } = useCheckLoginQuery();
  const userCurrent = user?.data?.email;
  const paramsRoom = pageQueryHanlder(1, 100);
  const { data: room } = useGetRoomQuery(
    {
      email: user?.data?.email || "",
      param: paramsRoom,
    },
    { skip: !loginSuccess || !user?.data?.id }
  );
  const paramsMessage = pageQueryHanlder(1, 1000);

  const [trigger, { isSuccess }] = useLazyGetMessageQuery();
  const [msg, setMsg] = useState<Message[]>([]);
  useEffect(() => {
    const fetch = async () => {
      if (room && room?.data.items?.length > 0) {
        const dataMessages = await trigger({
          roomId: room?.data?.items?.[0]?.conversationId || "",
          params: paramsMessage,
        }).unwrap();
        setMsg(dataMessages.data.items || []);
      }
    };
    fetch();
  }, [room?.data.items, paramsMessage]);
  const [createMessage] = useCreateMessageMutation();
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState<string>("");
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true); // Kiểm tra nếu đang ở cuối danh sách tin nhắn

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messageListRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (messageListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messageListRef.current;
      // Kiểm tra xem có ở dưới cùng không
      const isBottom = scrollHeight - scrollTop === clientHeight;
      if (isBottom !== isAtBottom) {
        setIsAtBottom(isBottom);
      }
    }
  };

  useEffect(() => {
    const fetch = () => {
      if (isSuccess) {
        const formattedMessages: MessageProps[] = msg.map((msg, index) => {
          const formattedDate = moment(
            msg.sendDate,
            "YYYY-MM-DD HH:mm:ss"
          ).toISOString(); // Chuyển sang định dạng ISO
          const timestamp = moment(formattedDate).format("hh:mm:ss"); // Lấy thời gian theo định dạng HH:mm:ss
          return {
            id: index + 1, // Đặt `id` là số tăng dần
            text: msg.content, // Sử dụng `content` hoặc `message`
            sender: msg.sender,
            messageType: msg.messageType,
            messageStatus: msg.messageStatus,
            timestamp: timestamp,
          };
        });
        setMessages(formattedMessages);
      }
    };
    fetch();
  }, [msg]);

  const toggleVisibility = (): void => {
    scrollToBottom(false);
    setIsVisible(!isVisible);
  };

  const handleSendMessage = async (file?: File) => {
    if (newMessage || file) {
      const newMsg: MessageProps = {
        id: messages.length + 1,
        text: newMessage || url || "",
        sender: userCurrent || "", // Hoặc bạn có thể thay đổi cho người nhận tùy theo logic
        messageType: getFileType(file), // Kiểm tra xem tin nhắn là text hay ảnh để đánh dấu loại tin nhắn
        messageStatus: MessageStatus.SENDING, // Đặt trạng thái đang gửi
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }), // Lấy thời gian hiện tại và chuyển thành chuỗi
      };
      setMessages([newMsg, ...messages]);
      try {
        const newFormData = new FormData();
        if (newMessage) {
          newFormData.append("message", newMessage);
        }
        if (file) {
          newFormData.append("file", file);
        }
        newFormData.append("sender", userCurrent || "");
        newFormData.append("receiver", "admin@gmail.com");
        const res = await createMessage(newFormData).unwrap();
        if (res.data.content) {
          console.log("123123");
          // await trigger({
          //   roomId: room?.data?.items?.[0]?.conversationId || "",
          //   params: paramsMessage,
          // }).unwrap();
          setUrl("");
          setFile(undefined);
        }

        setErr("");
        setNewMessage("");
      } catch (error) {
        console.log(error);
        if (file) {
          setErr(url);
          setUrl("");
          setFile(undefined);
          return;
        } else {
          setErr(newMessage);
        }
        setNewMessage("");
      }
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewMessage(e.target.value);
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const imageUrl = URL.createObjectURL(files[0]);
      setUrl(imageUrl);
      setFile(files[0]);
    }
  };
  useEffect(() => {
    handleSendMessage(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, file]);
  function getFileType(file?: File): MessageType {
    // Kiểm tra nếu file là kiểu MIME (như khi upload qua input)
    if (file && file.type) {
      if (file.type.startsWith("image/")) {
        return MessageType.IMAGE;
      } else if (file.type.startsWith("video/")) {
        return MessageType.VIDEO;
      }
    }
    return MessageType.TEXT;
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToBottom = (smooth: boolean = false): void => {
    if (messagesEndRef.current !== null) {
      // Kiểm tra null trước khi gọi
      setTimeout(() => {
        messagesEndRef.current!.scrollIntoView({
          behavior: smooth ? "smooth" : "auto",
        });
      }, 100); // Thời gian chờ 100ms (bạn có thể điều chỉnh thời gian theo nhu cầu)
    }
  };

  useEffect(() => {
    scrollToBottom(true); // Sử dụng `smooth` khi có tin nhắn mới
  }, [messages]);
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => scrollToBottom(true), 100);
    }
  }, [isVisible]);

  useEffect(() => {}, [isAtBottom]);
  return (
    <div
      className="d-flex flex-column gap-3 justify-content-end"
      style={{
        position: "fixed",
        bottom: 100,
        right: 40,
        zIndex: 1000,
      }}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.5 }}
            className="motion-message"
          >
            <div className="title-motion-ms">
              <div className="d-flex gap-2 align-items-center">
                <img
                  src="https://media.istockphoto.com/id/1445912539/vi/anh/t%E1%BB%9D-gi%E1%BA%A5y-tr%E1%BA%AFng.jpg?s=612x612&w=0&k=20&c=muPneG29Gp-hIEsAovlr0kQP1RXzKXUlJX5haaRnYhc="
                  width={40}
                  height={40}
                  style={{ borderRadius: "50%", border: "1px solid white" }}
                  alt=""
                />
                <span>SHOP OSON</span>
              </div>
              <i className="bi bi-x" onClick={toggleVisibility}></i>
            </div>
            {user?.data !== null && (
              <SimpleBar style={{ height: 290, marginTop: 5 }}>
                <div
                  className="message-list"
                  onScroll={handleScroll}
                  ref={messageListRef}
                >
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`message-${
                        message.sender === userCurrent ? "sender" : "receiver"
                      }`}
                      initial={{ y: -50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      exit={{ y: 50, opacity: 0 }}
                    >
                      <MessageContent
                        message={message}
                        userCurrent={userCurrent}
                        err={err}
                      />
                    </motion.div>
                  ))}
                </div>
                {/* <div ref={messageListRef} onClick={handleScroll} /> */}
                <div ref={messagesEndRef} />
              </SimpleBar>
            )}
            {user?.data === null && (
              <div
                style={{
                  pointerEvents: "auto",
                }}
              >
                <LoginMessage />
              </div>
            )}
            <div
              className="footer-motion"
              style={{  pointerEvents: (user?.data !== null) ? 'auto': "none" }}
            >
              <label
                htmlFor="file-message"
                className=""
                style={{ cursor: "pointer" }}
              >
                <i className="bi bi-camera"></i>
                <input
                  id="file-message"
                  type="file"
                  onChange={handleChangeImage}
                  className="hidden-button-file"
                ></input>
              </label>
              <input
                type="text"
                placeholder="Nhập tin nhắn"
                value={newMessage}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <i
                className="bi bi-send"
                style={{ rotate: "45deg", cursor: "pointer" }}
                onClick={() => handleSendMessage()}
              ></i>
            </div>

            {/* Hiển thị nút quay lại dưới khi không ở cuối */}
            {!isAtBottom && (
              <div
                onClick={() => scrollToBottom(true)}
                className="initial-message"
              >
                <i className="bi bi-arrow-down-short"></i>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="d-flex justify-content-end">
        <div
          className="icon-message"
          onClick={() => {
            toggleVisibility();
            scrollToBottom(false); // Gọi hàm scrollToBottom ở đây
          }}
        >
          <i className="bi bi-chat-left-heart"></i>
        </div>
      </div>
    </div>
  );
};

export default MessageView;
