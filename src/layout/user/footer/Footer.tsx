import './footer.scss'; // File SCSS tùy chỉnh của bạn

const Footer = () => {
  return (
    <div className="footer  pt-4 pb-3">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h5 className="fw-bold text-medium h5-ft">CHĂM SÓC KHÁCH HÀNG</h5>
            <ul className="list-unstyled">
              <li>Chính sách bảo hành </li>
              <li>Chính sách bảo mật</li>
              <li>Chính sách khách hàng thân thiết</li>
              <li>Câu hỏi thường gặp</li>
            </ul>
          </div>
          <div className="footer-section">
            <h5 className="fw-bold text-medium h5-ft">VỀ CHÚNG TÔI</h5>
            <ul className="list-unstyled">
              <li>Liên hệ</li>
              <li>Theo dõi đơn hàng</li>
              <li>Tuyển dụng</li>
              <li>Tin thời trang</li>
              <li>Hệ thông cửa hàng</li>
            </ul>
          </div>
          <div className="footer-section">
            <h5 className="fw-bold text-medium h5-ft">CHÍNH SÁCH</h5>
            <div>
              <ul className="list-unstyled">
                <li className="mb-2">Ưu đãi khách hàng thân thiết</li>
                <li className="mb-2">Bảo mật thông tin</li>
                <li className="mb-2">Giao hàng - Thanh toán</li>
              </ul>
              <img src="https://theme.hstatic.net/1000341902/1001140246/14/footer_trustbadge.png?v=1410" width={'100%'} alt="" />
            </div>
          </div>
          <div className="footer-section">
            <h5 className="fw-bold text-medium h5-ft">THEO CHÚNG TÔI TRÊN</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><i className="bi bi-facebook me-2"></i> FaceBook</li>
              <li className="mb-2"><i className="bi bi-instagram me-2"></i> Instagram</li>
              <li className="mb-2"><i className="bi bi-linkedin me-2"></i> LinkedIn</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="footer-bottom">
          <p>Địa chỉ: 251/33 Vườn Lài, An Phú Đông, Q12, tp.HCM</p>
          <p>Email: tcm172@gmail.com</p>
          <p>Điện thoại: 0961263780</p>
        </div>
      </div>
    </div>


  );
};

export default Footer;
