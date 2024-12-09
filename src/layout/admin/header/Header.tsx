import { useState } from "react";
import useRedirect from "../../../hooks/useRedirect";
import Navbar from "../navbar/Navbar";
import OffcanvasRight from "../../../components/offcanvas/OffcanvasRight";
import { isMobile } from "../../../utils/responsive";

const Header = () => {
    const redirect = useRedirect();
    const mobile = isMobile();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const offcanvasContent = (
        <Navbar />
    );
    return (
        <div className="p-2 ps-3" style={{ backgroundColor: 'rgb(244, 110, 39)', height: 64 }}>
            <div className="p-1 d-flex gap-2 cursor-pointer" style={{ position: 'relative' }} onClick={() => redirect('/')}>
                <img src="https://cdn.pixabay.com/photo/2024/06/04/01/57/desktop-wallpaper-4k-8807689_1280.jpg" alt="" width={40} height={40} />
                <div className="d-flex flex-column text-white ">
                    <span className="text-white">SẢN PHẨM CHẤT LƯỢNG</span>
                    <span className="text-white opacity-75">abc123@gmail.com.vn</span>
                </div>
                {mobile &&
                    <i
                        style={{
                            fontSize: 30, color: 'white', position: 'absolute', right: 0,
                            transform: 'rotateY(180deg)', transition: 'transform 0.5s ease',
                        }}
                        className="bi bi-list-ul"
                        onClick={(e) => {

                            { handleShow(); e.stopPropagation(); };
                        }}
                    ></i>}

            </div>

            {/* Offcanvas */}
            <OffcanvasRight
                show={show}
                onHide={handleClose}
                content={offcanvasContent}

            />

        </div>
    );
};

export default Header;
