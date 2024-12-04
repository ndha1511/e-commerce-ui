import { AnimatePresence, motion } from "framer-motion";
import './notification-items.scss'
import { NotificationModel } from "../../../models/notification";
import SimpleBar from "simplebar-react";
import moment from 'moment';
import { useCheckSeenMutation } from "../../../services/notification.service";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { isMobile } from "../../../utils/responsive";
function NotificationItems({ notifications, isVisible, setIsVisible, refetch,notificationHeaderRef }: {
    notifications: NotificationModel[],
    isVisible: boolean,
    setIsVisible: (visible: boolean) => void
    refetch: () => void
    notificationHeaderRef : React.RefObject<HTMLDivElement>
}) {
    const mobile = isMobile();
    const [checkSeen] = useCheckSeenMutation();
    const notificationRef = useRef<HTMLDivElement>(null);
    const calculateElapsedTime = (notificationTime: Date): string => {
        const notificationMoment = moment(notificationTime, 'YYYY-MM-DD HH:mm:ss'); // Chuyển thời gian thông báo sang đối tượng moment
        const now = moment(); // Thời gian hiện tại
        const duration = moment.duration(now.diff(notificationMoment)); // Tính khoảng thời gian đã trôi qua
        return duration.days() > 0 ? `${duration.days()} ngày trước`
            : duration.hours() > 0 ? `${duration.hours()} giờ trước`
                : `${duration.minutes()} phút trước`;

    };
    const handleSeen = async (notificationId: string) => {
        try {
            await checkSeen(notificationId);
            refetch();
        } catch (error) {
            console.log(error);
        }
    };
    const handleClickOutside = (event: MouseEvent) => {
        if (notificationRef.current && notificationHeaderRef.current && !notificationRef.current.contains(event.target as Node)
        && !notificationHeaderRef.current.contains(event.target as Node)) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <>
            {isVisible &&
                <div ref={notificationRef} className="d-flex flex-column gap-3 justify-content-end" style={{
                    position: 'absolute',
                    top: 45,
                    right: 0,
                    zIndex: 1000
                }}>
                    <AnimatePresence>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1, }}
                            exit={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="motion-notification"
                        >
                            <div className="border-bottom p-2 mb-1 text-black " style={{fontSize:12}}>Thông báo</div>
                            <SimpleBar style={{ height:mobile?250: 400 }}>
                                {notifications.slice().reverse().map((notification) => {
                                    const timestamp = calculateElapsedTime(notification.time)
                                    return (
                                        <div key={notification.id} className="content-notificaton" style={{
                                            backgroundColor: notification.seen === true ? '' : 'rgba(225, 220, 220, 0.3)'
                                        }} onClick={() => handleSeen(notification.id)}>
                                            <img src={notification.image} alt="" width={30} height={30} style={{ marginTop: 4 }} />
                                            <div>
                                                <span>{notification.title}</span>
                                                <div className="d-flex flex-column gap-1">
                                                    <span className="text-light-cs">{notification.content}</span>
                                                    <span className="text-light-cs" style={{ fontSize: 10 }}>{timestamp}</span>
                                                </div>
                                            </div>
                                            {notification.seen === false && <div className="dot-notifi"><FontAwesomeIcon fontSize={8} color="red" icon={faCircle} /></div>}
                                        </div>
                                    )
                                })}
                            </SimpleBar>
                        </motion.div>
                    </AnimatePresence>


                </div>
            }
        </>
    );
}

export default NotificationItems;