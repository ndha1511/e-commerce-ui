import React from 'react';
import { Container, Row, Col, Form, Badge } from 'react-bootstrap';
import CartItem from './CartItem';
import { BsChatDots } from 'react-icons/bs';

const Cart: React.FC = () => {
    const items = [
        {
            name: "Giày ZAVAS",
            description: "Giày thể thao nam ZAVAS phong cách sneaker êm, nhẹ, công nghệ tiên tiến",
            image: "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lfr0g93pyubb65",
            originalPrice: "550.000",
            discountedPrice: "419.000",
            quantity: 1,
            totalPrice: "419.000",
            variant: "Đen, 44",
            color: "Đen",
            size: "44"
        },
        {
            name: "Giày VNXK",
            description: "Giày thể thao nữ VNXK phong cách hiện đại, nhẹ nhàng",
            image: "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lfr0g93pyubb65",
            originalPrice: "450.000",
            discountedPrice: "350.000",
            quantity: 2,
            totalPrice: "700.000",
            variant: "Trắng, 37",
            color: "Trắng",
            size: "37"
        }
    ];

    return (
        <Container className="mt-4 bg-light p-3">
            <div className="cart-header border p-3 bg-white">
                <Row className="align-items-center">
                    <Col md={4} >
                        <div className='d-flex  align-items-center'>
                            <Form.Check type="checkbox" className='checkbox-cart me-4' />
                            <span style={{fontSize:16}} >Sản Phẩm</span>
                        </div>
                    </Col>

                    <Col md={2} className="text-center">
                        <span>Đơn Giá</span>
                    </Col>
                    <Col md={2} className="text-center">
                        <span>Số Lượng</span>
                    </Col>
                    <Col md={2} className="text-center">
                        <span>Số Tiền</span>
                    </Col>
                    <Col md={2} className="text-center">
                        <span>Thao Tác</span>
                    </Col>
                </Row>
            </div>
            <div className="cart-product-row border p-3 bg-white mt-2">
                <Row className="align-items-center">
                    <Col md={12} className='d-flex  align-items-center'>
                        <Form.Check type="checkbox" className='checkbox-cart me-4' />
                        <div>
                            <Badge bg="danger" className="me-2">Mall</Badge>
                            <span className="fw-bold me-2">Giày ZAVAS</span>
                            <BsChatDots color="#f05d23" />
                        </div>
                    </Col>
                </Row>
            </div>
            {items.map((item, index) => (
                <CartItem key={index} item={item} />
            ))}
            <Row className="mt-3">
                <Col>
                    <div className="border p-3 bg-white">
                        <p className="text-muted mb-2">
                            Voucher giảm đến 10% <a href="#">Xem thêm voucher</a>
                        </p>
                        <p className="text-muted mb-0">
                            Giảm ₫300.000 phí vận chuyển đơn tối thiểu ₫0; Giảm ₫500.000 phí vận chuyển đơn tối thiểu ₫500.000 <a href="#">Tìm hiểu thêm</a>
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;
