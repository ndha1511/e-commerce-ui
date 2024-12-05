import { Col, Row } from "react-bootstrap";
import { convertPrice } from "../../../../utils/convert-price";
import { ContentProps } from "../types";

const InfoOrder: React.FC<ContentProps> = (props) => {
  const { totalOrder, revenue } = props;
  return (
    <div
      className="pt-3 pb-3"
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Row className="ps-3 pt-3 g-2">
        {" "}
        {/* g-2 để tạo khoảng cách giữa các Row */}
        <Col xs={6} md={2} className="mb-2">
          {" "}
          {/* Chỉnh độ rộng cho cột ở thiết bị di động */}
          <strong>Tổng số đơn hàng:</strong>
        </Col>
        <Col xs={6} md={10} className="mb-2">
          {totalOrder || 0}
        </Col>
      </Row>

      <Row className="ps-3 pt-3 g-2">
        <Col xs={6} md={2} className="mb-2">
          <strong>Doanh thu:</strong>
        </Col>
        <Col xs={6} md={10} className="mb-2">
          {convertPrice(revenue?.revenue)}
        </Col>
      </Row>

      <Row className="ps-3 pt-3 g-2">
        <Col xs={6} md={2} className="mb-2">
          <strong>Lợi nhuận:</strong>
        </Col>
        <Col xs={6} md={10} className="mb-2">
          {convertPrice(revenue?.profit)}
        </Col>
      </Row>
    </div>
  );
};

export default InfoOrder;
