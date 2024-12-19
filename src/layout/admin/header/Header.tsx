import { useState } from "react";
import useRedirect from "../../../hooks/useRedirect";

import OffcanvasRight from "../../../components/offcanvas/OffcanvasRight";
import { isMobile } from "../../../utils/responsive";
import {
  useCheckLoginQuery,
  useLazyLogoutQuery,
} from "../../../services/auth.service";
import { Dropdown, Navbar } from "react-bootstrap";
import ChangePasswordModal from "./ChangePasswordModal";
import ProfileModal from "./ProfileModal";
import Avatar from "../../../components/avatar/Avatar";

const Header = () => {
  const redirect = useRedirect();
  const mobile = isMobile();
  const [show, setShow] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showModalChangePassword, setShowModalChangePassword] = useState(false);
  const { data: user } = useCheckLoginQuery();
  const [logoutHandler] = useLazyLogoutQuery();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onClose = () => setShowProfile(false);
  const handleCloseModal = () => setShowModalChangePassword(false);

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
      style={{ backgroundColor: "rgb(244, 110, 39)", height: 80 }}
    >
      <div
        className="p-1 d-flex gap-2 cursor-pointer"
        style={{ position: "relative" }}
        onClick={() => redirect("/")}
      >
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
              handleShow();
              e.stopPropagation();
            }}
          ></i>
        )}
      </div>

      <Dropdown
        align="end"
        style={{ position: "absolute", right: 30, bottom: -5 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Dropdown.Toggle
          variant="link"
          bsPrefix="avatar-dropdown-toggle"
          style={{ padding: 0, background: "none", border: "none" }}
        >
          <Avatar url={user?.data?.avatar} width={50} height={50} />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#profile" onClick={() => setShowProfile(true)}>
            Xem thông tin
          </Dropdown.Item>
          <Dropdown.Item
            href="#settings"
            onClick={() => setShowModalChangePassword(true)}
          >
            Đổi mật khẩu
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#logout" onClick={handlerLogout}>
            Đăng xuất
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Offcanvas */}
      <OffcanvasRight
        show={show}
        onHide={handleClose}
        content={offcanvasContent}
      />

      {showModalChangePassword && (
        <ChangePasswordModal
          user={user?.data?.email || ""}
          show={showModalChangePassword}
          onHide={handleCloseModal}
        />
      )}

      {showProfile && (
        <ProfileModal showModal={showProfile} onClose={onClose} />
      )}
    </div>
  );
};

export default Header;
