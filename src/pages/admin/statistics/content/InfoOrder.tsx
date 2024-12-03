import { Col, Row } from "react-bootstrap";
import { convertPrice } from "../../../../utils/convert-price";
import { ContentProps } from "../types";

const InfoOrder: React.FC<ContentProps> = (props) => {
    const {totalOrder, revenue} = props;
    return <div className="pt-3 pb-3" style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.1)"
    }}>
        <Row className="ps-3 pt-3">
            <Col md={2}>Tổng số đơn hàng:</Col>
            <Col>{totalOrder || 0}</Col>
        </Row>
        <Row className="ps-3 pt-3">
            <Col md={2}>Doanh thu:</Col>
            <Col>{convertPrice(revenue?.revenue)}</Col>
        </Row>
        <Row className="ps-3 pt-3">
            <Col md={2}>Lợi nhuận:</Col>
            <Col>{convertPrice(revenue?.profit)}</Col>
        </Row>
    </div>
}

export default InfoOrder;