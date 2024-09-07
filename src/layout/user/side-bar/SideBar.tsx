import useRedirect from '../../../hooks/useRedirect';
import { isAbsoluteLocation } from '../../../utils/location';
import './side-bar.scss';

const SideBar = () => {
    const redirect = useRedirect();
    return <div className='side-bar-container'>
        <div className='container side-bar-container'>
            <div className={`side-bar-content`}>
                <span className={`side-bar-item ${isAbsoluteLocation('/') ? 'primary' : ''}`}
                    onClick={() => redirect('/')}
                >
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
                <span className={`side-bar-item ${isAbsoluteLocation('/cart') ? 'primary' : ''}`}
                    onClick={() => redirect('/cart')}
                >
                    <i className="bi bi-cart-fill"></i>
                    Giỏ hàng
                </span>
                <span className='side-bar-item' onClick={() => redirect('/login')}>Đăng nhập</span>
                <span className='side-bar-item' onClick={() => redirect('/register')}>Đăng ký</span>
            </div>
        </div>
    </div>
}

export default SideBar;