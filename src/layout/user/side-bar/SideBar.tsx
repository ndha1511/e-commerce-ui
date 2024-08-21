import './side-bar.scss';

const SideBar = () => {
    return <div className='side-bar-container'>
        <div className='container side-bar-container'>
            <div className='side-bar-content'>
                <span className='side-bar-item'>
                    <i className="bi bi-house-fill"></i>
                    Trang chủ
                </span>
                <span className='side-bar-item'>
                    Kênh người bán
                </span>
            </div>
            <div className='side-bar-content'>
                <span className='side-bar-item'>
                    <i className="bi bi-bell-fill"></i>
                    Thông báo
                </span>
                <span className='side-bar-item'>
                    <i className="bi bi-cart-fill"></i>
                    Giỏ hàng
                </span>
                <span className='side-bar-item'>Đăng nhập</span>
                <span className='side-bar-item'>Đăng ký</span>
            </div>
        </div>
    </div>
}

export default SideBar;