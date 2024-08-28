import { useState } from 'react';
import './Login.scss'; // Optional, if you want to add custom styles
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import icon mới
import image from '../../../../assert/logo.jpg';
import image1 from '../../../../assert/logo2.jpg';
import background from "../../../../assert/nen.jpg";


function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className=" w-100 d-flex align-items-stretch justify-content-center ">
        {/* Phần chứa hình ảnh */}
        <div className="card login-card1 p-4 shadow d-flex align-items-center justify-content-center">
          <img  src={image1} alt="Shop Logo" style={{ width: '400px', height: '400px' }} />
        </div>
        {/* Phần chứa form đăng nhập */}
        <div className="card login-card p-4 shadow flex-grow-1">
          <div className="text-center mb-4">
            <h3 className="text-center">ĐĂNG NHẬP</h3>
          </div>
          <form>
            <div className="mb-3">
              <input type="text" className="form-control no-shadow" placeholder="Email/Số điện thoại/Tên đăng nhập" />
            </div>
            <div className="mb-3 position-relative">
              <input
                type={passwordVisible ? "text" : "password"}
                className="form-control no-shadow"
                placeholder="Mật khẩu"
              />
              <span
                className="position-absolute top-50 end-0 translate-middle-y pe-3"
                style={{ cursor: 'pointer' }}
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
            <div className="d-grid pt-4">
              <button type="submit" className="btn btn-danger">Đăng nhập</button>
            </div>
            <div className="text-end mt-3">
              <a href="#" className="a-disable-default">Quên mật khẩu</a>
            </div>
            <hr />
            <div className="d-flex justify-content-center">
              <button className="btn btn-outline-primary me-3 btn-social">
                <FaFacebook className="me-2" /> Facebook
              </button>
              <button className="btn btn-outline-danger btn-social">
                <FaGoogle className="me-2" /> Google
              </button>
            </div>
            <p className="text-center mt-3">
              Bạn mới biết đến nền tảng? <a href="#" className="text-danger">Đăng ký</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
