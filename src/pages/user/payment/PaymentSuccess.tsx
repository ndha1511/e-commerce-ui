import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './payment.scss'
import useRedirect from "../../../hooks/useRedirect";
import { isMobile } from "../../../utils/responsive";
import { useLocation } from "react-router-dom";
function PaymentSuccess() {
    const redirect = useRedirect();
    const location = useLocation();
    const newOrder = location.state;
    const mobile = isMobile();
    return (
        <div style={{
            width:'100%',
            height: '300px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            backgroundColor: 'white',
            flexDirection: 'column',
            gap:30
        }}>
            <div className="d-flex align-items-center gap-3">
                <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'red', fontSize: '24px' }} />
                <span className="text-large">Đặt hàng thành công</span>
            </div>
            <div className={`d-flex flex-column align-items-center ${mobile ? 'w-75 text-center':''}`}>
                <span>Cảm ơn bạn đã đặt hàng! Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.</span>
                <span>Hãy quay lại để khám phá thêm nhiều sản phẩm thú vị.</span>
            </div>
            <div className={`d-flex gap-3 justify-content-between   ${mobile ? 'w-100 ps-4 pe-4': 'w-25'}`}>
                <button className="btn-payment-success" onClick={()=>redirect("/")}>Trang chủ</button>
                <button className="btn-payment-success" onClick={()=>redirect("/user/purchase/"+newOrder.id)}>Đơn mua</button>
            </div>
        </div>
    );
}

export default PaymentSuccess;