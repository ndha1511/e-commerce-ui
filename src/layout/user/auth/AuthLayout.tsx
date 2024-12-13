import { ReactNode } from "react";
import logo from "../../../assets/logo/logo.jpg";
import { isMobile } from "../../../utils/responsive";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const mobile: boolean = isMobile();
  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className=" w-100 d-flex align-items-stretch justify-content-center p-2">
        {/* Phần chứa hình ảnh */}
        {!mobile && (
          <div className="card login-card1 p-4 shadow d-flex align-items-center justify-content-center gap-2">
            <img src={logo} alt="Shop Logo" style={{ borderRadius: 20 }} />
            <h5 className="primary">Chào mừng đến với OSON</h5>
          </div>
        )}
        {/* Phần chứa form đăng nhập */}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
