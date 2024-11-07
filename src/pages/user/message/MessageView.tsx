import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, ChangeEvent, useLayoutEffect, KeyboardEvent } from "react";
import './message.scss';
import SimpleBar from "simplebar-react";
import { pageQueryHanlder } from "../../../utils/query-handler";
import { useGetRoomQuery } from "../../../services/room.service";
import { useCheckLoginQuery } from "../../../services/auth.service";
import { useCreateMessageMutation, useGetMessageQuery } from "../../../services/message.service";
import MessageContent from "./MessageContent";
interface MessageProps {
    id: number;
    text: string;
    sender: string;
    timestamp: string;
}

const MessageView: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const { data: user, isSuccess: loginSuccess } = useCheckLoginQuery();
    const userCurrent = user?.data?.email;
    const paramsRoom = pageQueryHanlder(1, 100);
    const { data: room, isSuccess: roomSuccess } = useGetRoomQuery({
        email: user?.data?.email || '',
        param: paramsRoom,
    }, { skip: !loginSuccess || !user?.data?.id })
    const paramsMessage = pageQueryHanlder(1, 1000);
    const { data: messagesData } = useGetMessageQuery({
        roomId: room?.data?.items?.[0]?.conversationId || '',
        params: paramsMessage,
    }, { skip: !roomSuccess });
    const [createMessage] = useCreateMessageMutation();
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");
    const [file, setFile] = useState<File>();
    const [url, setUrl] = useState<string>("");
    const [isAtBottom, setIsAtBottom] = useState<boolean>(true); // Kiểm tra nếu đang ở cuối danh sách tin nhắn

    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const messageListRef = useRef<HTMLDivElement | null>(null);
    // const messageListRef = useRef<HTMLDivElement | null>(null);

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
        if (messagesData) {
            const formattedMessages: MessageProps[] = messagesData.data.items.map((msg, index) => ({
                id: index + 1, // Đặt `id` là số tăng dần
                text: msg.content || msg.message, // Sử dụng `content` hoặc `message`
                sender: msg.sender,
                timestamp: new Date(msg.sendDate).toLocaleTimeString(), // Định dạng thời gian
            }));
            setMessages(formattedMessages);
        }
    }, [messagesData]);
    const toggleVisibility = (): void => {
        scrollToBottom(false);
        setIsVisible(!isVisible);
    };
    const handleSendMessage = async () => {
        if (newMessage || file) {
            const newMsg: MessageProps = {
                id: messages.length + 1,
                text: newMessage || url || '',
                sender: userCurrent || '', // Hoặc bạn có thể thay đổi cho người nhận tùy theo logic
                timestamp: new Date().toLocaleTimeString(),  // Lấy thời gian hiện tại và chuyển thành chuỗi
            };
            setMessages([...messages, newMsg]);
            try {
                const newFormData = new FormData();
                if (newMessage) {
                    newFormData.append('message', newMessage);
                }
                if (file) {
                    newFormData.append('file', file);
                }
                newFormData.append('sender', userCurrent || '');
                newFormData.append('receiver', 'ndha1115@gmail.com');
                await createMessage(newFormData).unwrap();
                setNewMessage("");

            } catch (error) {
                console.log(error);
                alert('thanhf k coong')
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
            // Tạo tin nhắn mới với URL của ảnh và thêm vào mảng `messages`
            const newMsg: MessageProps = {
                id: messages.length + 1,
                text: imageUrl, // Gán URL của ảnh vào `text`
                sender: userCurrent || '',
                timestamp: new Date().toLocaleTimeString(),
            };
            setMessages([...messages, newMsg]);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const scrollToBottom = (smooth: boolean = false): void => {
        if (messagesEndRef.current !== null) { // Kiểm tra null trước khi gọi
            messagesEndRef.current.scrollIntoView({
                behavior: smooth ? 'smooth' : 'auto',
            });
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

    useEffect(() => {
        console.log('isAtBottom:', isAtBottom); // Thêm log kiểm tra giá trị của isAtBottom
    }, [isAtBottom]);
    return (
        <div className="d-flex flex-column gap-3 justify-content-end" style={{
            position: 'fixed',
            bottom: 100,
            right: 40,
            zIndex: 1000
        }}>
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
                                <img src="https://images2.thanhnien.vn/528068263637045248/2023/4/23/edit-truc-anh-16822518118551137084698.png" width={40} height={40}
                                    style={{ borderRadius: '50%', border: '1px solid white' }} alt="" />
                                <span>SHOP OOSC</span>
                            </div>
                            <i className="bi bi-x" onClick={toggleVisibility}></i>
                        </div>
                        <SimpleBar style={{ height: 290, marginTop: 5 }}  >
                            <div className="message-list" onScroll={handleScroll} ref={messageListRef} >
                                {messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        className={`message-${message.sender === "minhboy172@gmail.com" ? "sender" : "receiver"}`}
                                        initial={{ y: -50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        exit={{ y: 50, opacity: 0 }}
                                    >
                                        {/* <div className="message-text ">{message.text}
                                            {url && <img src={message.text} alt=""
                                                width={40} height={40}
                                            />}
                                            <div className="message-time " style={{
                                                justifyContent: message.sender === "sender" ? 'end': 'start'}}>{message.timestamp}
                                                </div>
                                        </div> */}
                                        <MessageContent text={message.text} sender={message.sender} />

                                    </motion.div>
                                ))}
                            </div>
                            {/* <div ref={messageListRef} onClick={handleScroll} /> */}
                            <div ref={messagesEndRef} />
                        </SimpleBar>

                        <div className="footer-motion">
                            <label htmlFor='file-message' className=''
                                style={{ cursor: 'pointer' }}
                            >
                                <i className="bi bi-camera"></i>
                                <input accept='image/*' id='file-message' type='file' onChange={handleChangeImage} className='hidden-button-file'></input>
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
                                style={{ rotate: '45deg', cursor: 'pointer' }}
                                onClick={handleSendMessage}
                            ></i>

                        </div>

                        {/* Hiển thị nút quay lại dưới khi không ở cuối */}
                        {!isAtBottom && (
                            <div onClick={() => scrollToBottom(true)} className="initial-message">
                                <i className="bi bi-arrow-down-short"></i>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="d-flex justify-content-end">
                <div className="icon-message" onClick={() => {
                    toggleVisibility();
                    scrollToBottom(false); // Gọi hàm scrollToBottom ở đây
                }}>
                    <i className="bi bi-chat-left-heart"></i>
                </div>
            </div>

        </div>
    );
};

export default MessageView;
