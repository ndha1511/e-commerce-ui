import { Row, Col, Badge } from 'react-bootstrap';
import { BsGeoAltFill } from 'react-icons/bs';

const Address = () => {
    return (
        <div className="p-3 bg-white ">
            <Row className="align-items-center">
                <Col md={10}>
                    <div className="d-flex align-items-center mb-2">
                        <BsGeoAltFill color="red" className="me-2" />
                        <h6 className="mb-0 text-danger">Địa Chỉ Nhận Hàng</h6>
                    </div>
                    <div>
                        <strong>Trần Công Minh</strong> (+84) 961263780
                    </div>
                    <div className="mt-2">
                        224/27/96/13, Đường Vườn Lài, Phường An Phú Đông, Quận 12, TP. Hồ Chí Minh
                        {/* <Badge bg="light" text="danger" className="ms-2 border border-danger">
                            Mặc Định
                        </Badge> */}
                    </div>

                </Col>
                <Col md={2}> <span className='info'>Thay đổi</span></Col>
            </Row>
        </div>
    );
};

export default Address;
