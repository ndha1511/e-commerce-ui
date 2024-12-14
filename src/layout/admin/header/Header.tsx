import { useState } from "react";
import useRedirect from "../../../hooks/useRedirect";
import Navbar from "../navbar/Navbar";
import OffcanvasRight from "../../../components/offcanvas/OffcanvasRight";
import { isMobile } from "../../../utils/responsive";
import { useCheckLoginQuery, useLazyLogoutQuery } from "../../../services/auth.service";
import { Dropdown } from "react-bootstrap";
import ChangePasswordModal from "./ChangePasswordModal";
import ProfileModal from "./ProfileModal";

const Header = () => {
  const redirect = useRedirect();
  const mobile = isMobile();
  const [show, setShow] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showModalChagePassword, setShowModalChagePassword] = useState(false);
  const { data: user } = useCheckLoginQuery();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onClose = () => {
    setShowProfile(false);
  };
  const handleCloseModal = () => {
    setShowModalChagePassword(false);
  };
    const [logoutHandler] = useLazyLogoutQuery();
  const handlerLogout = async () => {
    try {
      await logoutHandler().unwrap();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const offcanvasContent = <Navbar />;
  return (
    <div
      className="p-2 ps-3"
      style={{ backgroundColor: "rgb(244, 110, 39)", height: 64 }}
    >
      <div
        className="p-1 d-flex gap-2 cursor-pointer"
        style={{ position: "relative" }}
        onClick={() => redirect("/")}
      >
        <img
          src="https://cdn.pixabay.com/photo/2024/06/04/01/57/desktop-wallpaper-4k-8807689_1280.jpg"
          alt=""
          width={40}
          height={40}
        />
        <div className="d-flex flex-column text-white ">
          <span className="text-white">SẢN PHẨM CHẤT LƯỢNG</span>
          <span className="text-white opacity-75">abc123@gmail.com.vn</span>
        </div>
        {mobile && (
          <i
            style={{
              fontSize: 30,
              color: "white",
              position: "absolute",
              right: 0,
              transform: "rotateY(180deg)",
              transition: "transform 0.5s ease",
            }}
            className="bi bi-list-ul"
            onClick={(e) => {
              {
                handleShow();
                e.stopPropagation();
              }
            }}
          ></i>
        )}

        <Dropdown
          align="end" // Định vị menu ở bên phải
          style={{
            position: "absolute",
            right: 30,
            bottom: 1,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Dropdown.Toggle
            variant="link"
            bsPrefix="avatar-dropdown-toggle"
            style={{
              padding: 0,
              background: "none",
              border: "none",
            }}
          >
            <img
              src={user?.data?.avatar}
              alt=""
              style={{
                borderRadius: "50%",
                border: "1px solid white",
                cursor: "pointer",
              }}
              width={50}
              height={50}
            />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#profile" onClick={()=> setShowProfile(true)}>Xem thông tin </Dropdown.Item>
            <Dropdown.Item
              href="#settings"
              onClick={() => setShowModalChagePassword(true)}
            >
              Đổi mật khẩu
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#logout" onClick={handlerLogout}>Đăng xuất</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Offcanvas */}
      <OffcanvasRight
        show={show}
        onHide={handleClose}
        content={offcanvasContent}
      />
      {showModalChagePassword && (
        <ChangePasswordModal
          user={user?.data?.email || ""}
          show={showModalChagePassword}
          onHide={handleCloseModal}
        />
      )}
      {showProfile && (
        <ProfileModal showModal={showProfile} onClose={onClose}/>
      )}
    </div>
  );
};

export default Header;
