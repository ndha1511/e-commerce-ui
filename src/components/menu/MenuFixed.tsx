import { isAbsoluteLocation, isLocation, redirect } from "../../utils/location";
import "./menu-fixed.scss";

type Props = {
    fixedSearch: boolean;
}

const MenuFixed = ({ fixedSearch }: Props) => {


    return <div className="menu-container">
        {!isAbsoluteLocation('/') && <div className="menu-item" onClick={() => redirect('/')}>
            <i className="bi bi-house-door"></i>
            <span className="text-small">Trang chủ</span>
        </div>}
        {!isLocation('/user') && <div className="menu-item" onClick={() => redirect('/user/account/profile')}>
            <i className="bi bi-person-circle"></i>
            <span className="text-small">Tài khoản</span>
        </div>}
        {!isLocation('/cart') && <div className="menu-item" onClick={() => redirect('/cart')}>
            <i className="bi bi-bag"></i>
            <span className="text-small">Giỏ hàng</span>
            <span className="badge background-primary text-small">2</span>
        </div>}
        <div className="menu-item">
            <i className="bi bi-chat-dots"></i>
            <span className="text-small">Tin nhắn</span>
            <span className="badge background-primary text-small">2</span>
        </div>
        <div className="menu-item">
            <i className="bi bi-bell"></i>
            <span className="text-small">Thông báo</span>
            <span className="badge background-primary text-small">2</span>
        </div>
        {fixedSearch && <div className="menu-item" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <i className="bi bi-arrow-up-circle"></i>
            <span className="text-small">Đầu trang</span>
        </div>}

    </div>
}

export default MenuFixed;