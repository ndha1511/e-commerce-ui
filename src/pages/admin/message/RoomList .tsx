import SimpleBar from "simplebar-react";
import { Room } from "../../../models/room";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Avatar from "../../../components/avatar/Avatar";

interface RoomListProps {
    sortedRooms: Room[] | undefined;
    handleActive: (id: string) => void;
    handleUpdateRoom: (id: string, count: number) => void;
}
const RoomList: React.FC<RoomListProps> = ({ sortedRooms, handleActive, handleUpdateRoom }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div style={{ position: 'relative' }}>
            <div className={isOpen ? 'search-message-active' : 'search-message'}>
                <i className="bi bi-search"></i>
                <input type="text" placeholder='Tìm kiếm '
                    onFocus={() => setIsOpen(true)} // Mở khi nhấn vào input
                />
                {isOpen && <span onClick={() => setIsOpen(false)}>Đóng</span>}
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ scale: 0, x: 0, y: 0 }} // Bắt đầu từ góc trái trên (thu nhỏ)
                        animate={{ scale: 1 }} // Chỉ mở rộng, không dịch chuyển
                        exit={{ scale: 0 }} // Khi thoát, thu nhỏ về 0
                        transition={{ duration: 0.3 }} // Thời gian hiệu ứng
                        className="motion-search-message"
                    >
                        <SimpleBar style={{ height: 500 }}>
                            <div className="p-2">
                                <span>Liên hệ (131)</span>
                            </div>
                            {sortedRooms?.map((item: Room) => (
                                <div
                                    key={item.conversationId}
                                    className="d-flex align-items-center gap-2 menu-message-items"
                                    onClick={() => { handleActive(item.conversationId); handleUpdateRoom(item.conversationId, item.count); }}
                                >
                                  <Avatar url={item.avatarReceiver}/>
                                    <div className="d-flex flex-column gap-1">
                                        <span>{item.receiver}</span>
                                        <span className="text-muted">
                                            {(item.count === 0 && item.seen === false) ? 'Bạn: ' : ''}{item.lastMessageSender}
                                        </span>
                                    </div>
                                    {(item.seen === false && item.count > 0) && <div className='count-message'>{item.count}</div>}
                                </div>
                            ))}
                        </SimpleBar>
                    </motion.div>
                )}
            </AnimatePresence>
            <SimpleBar style={{ height: 500 }}>
                {sortedRooms?.map((item: Room) => (
                    <div
                        key={item.conversationId}
                        className="d-flex align-items-center gap-2 menu-message-items"
                        onClick={() => { handleActive(item.conversationId); handleUpdateRoom(item.conversationId, item.count) }}
                    >
                        <Avatar url={item.avatarReceiver}/>
                        <div className="d-flex flex-column gap-1">
                            <span>{item.receiver}</span>
                            <span className="text-muted">
                                {(item.count === 0 && item.seen === false) ? 'Bạn: ' : ''}{item.lastMessageSender}
                            </span>
                        </div>
                        {(item.seen === false && item.count > 0) && <div className='count-message'>{item.count}</div>}
                    </div>
                ))}
            </SimpleBar>
        </div>
    );
}

export default RoomList;
