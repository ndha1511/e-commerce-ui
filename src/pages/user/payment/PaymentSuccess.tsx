import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./payment.scss";
import useRedirect from "../../../hooks/useRedirect";
import { isMobile } from "../../../utils/responsive";
import { useLocation } from "react-router-dom";
import useGetParam from "../../../hooks/useGetParam";

function PaymentSuccess() {
  const redirect = useRedirect();
  const location = useLocation();
  const newOrder = location.state;
  const mobile = isMobile();
  const success = useGetParam("success");

  return (
    <div
      style={{
        width: "100%",
        height: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "white",
        flexDirection: "column",
        gap: 30,
      }}
    >
      <div className="d-flex align-items-center gap-3">
        <FontAwesomeIcon
          icon={faCheckCircle}
          style={{ color: "red", fontSize: "24px" }}
        />
        <span className="text-large">
          {success === "true"
            ? "Đặt hàng thành công"
            : "Đặt hàng không thành công !!!"}
        </span>
      </div>
      <div
        className={`d-flex flex-column align-items-center ${
          mobile ? "w-75 text-center" : ""
        }`}
      >
        <span>
          {success === "true"
            ? "Cảm ơn bạn đã đặt hàng! Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất."
            : "Đặt hàng thất bại, vui lòng thử lại sau."}
        </span>
        {success === "true" && (
          <span>Hãy quay lại để khám phá thêm nhiều sản phẩm thú vị.</span>
        )}
      </div>
      <div
        className={`d-flex gap-3 justify-content-between   ${
          mobile ? "w-100 ps-4 pe-4" : "w-25"
        }`}
      >
        <button className="btn-payment-success" onClick={() => redirect("/")}>
          Trang chủ
        </button>
        {success === "true" && (
          <button
            className="btn-payment-success"
            onClick={() => redirect("/user/purchase/" + newOrder.id)}
          >
            Đơn mua
          </button>
        )}
      </div>
    </div>
  );
}

export default PaymentSuccess;
