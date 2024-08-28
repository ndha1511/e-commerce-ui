import { useEffect, useState } from "react";
import { isAbsoluteLocation, isLocation, redirect } from "../../utils/location";
import "./menu-fixed.scss";

type Props = {
    fixedSearch: boolean;
}

const MenuFixed = ({ fixedSearch }: Props) => {

    const [showMenu, setShowMenu] = useState<boolean>(true);
    const isMobile: boolean = window.innerWidth <= 768;

    useEffect(() => {
        const container1: HTMLElement | null = document.querySelector('.menu-container');
        const container2: HTMLElement | null = document.querySelector('.menu-container-2');

        const updateHeight = () => {
            if (container1 && container2) {
                container2.style.height = `${container1.offsetHeight}px`;
            }
        };
        const resizeObserver = new ResizeObserver(() => {
            updateHeight();
        });
        if (container1) {
            resizeObserver.observe(container1);
        }
        updateHeight();

        return () => {
            if (container1) {
                resizeObserver.unobserve(container1);
            }
        };
    }, []);

    useEffect(() => {
        const container: HTMLElement | null = document.querySelector('.menu-container');
        const container2: HTMLElement | null = document.querySelector('.menu-container-2');

        if (container && container2) {
            if (showMenu) {
                container.classList.remove('hidden');
                container2.classList.remove('visible');
            } else {
                container.classList.add('hidden');
                container2.classList.add('visible');
            }
        }
    }, [showMenu]);

    return <>
        <div className="menu-container">
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
                <span className="badge-item background-primary text-small">2</span>
            </div>}
            <div className="menu-item">
                <i className="bi bi-chat-dots"></i>
                <span className="text-small">Tin nhắn</span>
                <span className="badge-item background-primary text-small">2</span>
            </div>
            <div className="menu-item">
                <i className="bi bi-bell"></i>
                <span className="text-small">Thông báo</span>
                <span className="badge-item background-primary text-small">2</span>
            </div>

            {fixedSearch && <div className="menu-item" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <i className="bi bi-arrow-up-circle"></i>
                <span className="text-small">Đầu trang</span>
            </div>}

            {isMobile && <button className="show-menu border text-medium primary" onClick={() => setShowMenu(false)}>
                <i className="bi bi-arrow-right-circle-fill"></i>
            </button>}
        </div>
        <div className="menu-container-2">
            <button className="show-menu border text-medium primary" onClick={() => setShowMenu(true)}>
                <i className="bi bi-arrow-left-circle-fill"></i>
            </button>
        </div>
    </>
}

export default MenuFixed;
