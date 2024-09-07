import { Container, Row, Col, Button, Form, Image } from 'react-bootstrap';
import Address from '../../../components/address/Address';
import './payment.scss'
import { BsCheckSquareFill } from 'react-icons/bs';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const Payment = () => {
    const products = [
        {
            id: 1,
            image: 'https://via.placeholder.com/50', // Thay thế bằng hình ảnh sản phẩm của bạn
            name: 'Đầm nút kiểu phối voan cột nơ cổ màu y hình thun mỹ voan chingfon T1203',
            salePrice: '120.000đ',
            originalPrice: '181.651đ',
            quantity: 1,
            size: 'M',
            color: 'ĐEN'
        },
        {
            id: 2,
            image: 'https://via.placeholder.com/50', // Thay thế bằng hình ảnh sản phẩm của bạn
            name: 'Đầm nút kiểu phối voan cột nơ cổ màu y hình thun mỹ voan chingfon T1203',
            salePrice: '120.000đ',
            originalPrice: '181.651đ',
            quantity: 1,
            size: 'L',
            color: 'ĐEN'
        },
        {
            id: 1,
            image: 'https://via.placeholder.com/50', // Thay thế bằng hình ảnh sản phẩm của bạn
            name: 'Đầm nút kiểu phối voan cột nơ cổ màu y hình thun mỹ voan chingfon T1203',
            salePrice: '120.000đ',
            originalPrice: '181.651đ',
            quantity: 1,
            size: 'M',
            color: 'ĐEN'
        },
        {
            id: 2,
            image: 'https://via.placeholder.com/50', // Thay thế bằng hình ảnh sản phẩm của bạn
            name: 'Đầm nút kiểu phối voan cột nơ cổ màu y hình thun mỹ voan chingfon T1203',
            salePrice: '120.000đ',
            originalPrice: '181.651đ',
            quantity: 1,
            size: 'L',
            color: 'ĐEN'
        },
    ];
    return (
        <Container className="p-2 bg-light border rounded ">
            <Row className="">
                <Col md={8} className='border'>
                    <div><Address /></div>
                    <div className=' p-3 '>
                        <Row className="bg-white border border-radius-small">
                            {/* Lời nhắn */}
                            <Col md={6} className='border p-2'>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Lời nhắn:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Lưu ý cho Người bán..."
                                        rows={1} // Đặt số dòng ban đầu
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className='border p-2'>
                                <div className='mb-3'>
                                    <span className="fw-bold ">Đơn vị vận chuyển:</span>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span className="text-end">Nhanh</span>
                                    <span className='info'>Thay đổi</span>
                                    <span className="primary fw-bold ms-2">₫1.143.000</span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className=' p-3 bg-white border border-radius-small '>
                        <div>
                            <span>Phương thức thanh toán: </span>
                            <div className='d-flex mt-2'>
                                <Button className='payment-button me-3' >
                                    Thanh toán khi nhận hàng
                                </Button>
                                <Button className='payment-button'>
                                    Chuyển khoản ngân hàng
                                </Button>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={4} className='border'>
                    <div className='p-3 bg-white border border-radius-small '>
                        <div className="d-flex align-items-center mb-2 pb-3 border-bottom">
                            <BsCheckSquareFill className="text-primary me-2" />
                            <h6 className="mb-0">Thông tin đơn hàng</h6>
                        </div>
                        <SimpleBar  className='order-payment'>
                       <div>     {/* Tên shop */}
                            <div className="mb-2">
                                <span className="text-muted">Bán bởi shop: </span>
                                <span className="fw-bold">trùm sỉ thời trang</span>
                            </div>

                            <div className="mb-2">
                                <span className="text-muted">Voucher của shop: </span>
                                <span className="primary fw-bold ms-2">15k</span>
                                <span className="info fw-bold ms-2 btn-pointer">Chọn voucher khác</span>
                            </div>

                            {/* Danh sách sản phẩm */}

                            {products.map((product) => (
                                <div key={product.id} className="border-bottom mb-3 pb-3 order-items">
                                    <Row>
                                        <Col xs={2}>
                                            <Image src={product.image} fluid />
                                        </Col>
                                        <Col xs={7}>
                                            <p className="mb-1">{product.name}</p>
                                            <div className='d-flex'>
                                                <div className="primary fw-bold me-2">{product.salePrice}</div>
                                                <div className="text-muted text-decoration-line-through">{product.originalPrice}</div>
                                            </div>
                                        </Col>
                                        <Col xs={3} className="text-end">
                                            <div>x {product.quantity}</div>
                                        </Col>
                                    </Row>
                                    <div className="mt-2">
                                        <span style={{ borderRight: '1px solid black' }} className='p-2'>{product.size}</span>
                                        <span className='p-2'>{product.color}</span>
                                    </div>
                                </div>
                            ))}</div>
                        </SimpleBar >
                        <div className="mb-2">
                            <span className="text-muted">Voucher ưu đãi của sàn: </span>
                            <span className="primary fw-bold ms-2">15k</span>
                            <span className="info fw-bold ms-2 btn-pointer">Chọn voucher khác</span>
                        </div>
                        <div className="p-3 bg-white border rounded">
                            <Row className="mb-2">
                                <Col xs={6} className="text-muted">Tổng tiền hàng</Col>
                                <Col xs={6} className="text-end">₫695.000</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={6} className="text-muted">Phí vận chuyển</Col>
                                <Col xs={6} className="text-end">₫64.900</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={6} className="text-muted">Tổng cộng Voucher giảm giá:</Col>
                                <Col xs={6} className="text-end">-₫25.000</Col>
                            </Row>
                            <hr />
                            <Row className="mb-3">
                                <Col xs={6} className="fw-bold">Tổng thanh toán</Col>
                                <Col xs={6} className="text-end primary" style={{ fontSize: '1.5rem' }}>₫734.900</Col>
                            </Row>
                            <button className="w-100 button-flex button-hover background-primary text-large " style={{ border: 'none' }}>Đặt hàng</button>
                        </div>
                    </div>
                </Col>
            </Row>

        </Container>
    );
};

export default Payment;
