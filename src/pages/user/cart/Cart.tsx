import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import CartItem from './CartItem';


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
    const [isFooterFixed, setIsFooterFixed] = useState(true);
    const [isHeaderFixed, setIsHeaderFixed] = useState(false);

    const handleScroll = () => {
        const cartItemsHeight = document.getElementById('cart-items')?.offsetHeight || 0;
        const scrollPosition = window.pageYOffset + window.innerHeight;

        // Điều kiện để cố định header khi cuộn xuống
        if (window.pageYOffset > 150) { // Giá trị 150 là tùy chỉnh, bạn có thể điều chỉnh để phù hợp với yêu cầu thực tế
            setIsHeaderFixed(true);
        } else {
            setIsHeaderFixed(false);
        }

        // Điều kiện để di chuyển footer khi cuộn hết danh sách sản phẩm
        if (scrollPosition >= cartItemsHeight + 150) {
            setIsFooterFixed(false);
        } else {
            setIsFooterFixed(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <Container className="mt-4 bg-light p-3 border-radius-small">
            <div className={`cart-header border p-3 bg-white ${isHeaderFixed ? 'fixed-header container' : ''}`}>
                <Row className="align-items-center">
                    <Col md={4} >
                        <div className='d-flex  align-items-center'>
                            <Form.Check type="checkbox" className='checkbox-cart me-4' />
                            <span style={{ fontSize: 16 }} >Sản Phẩm</span>
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
            
            <div id="cart-items" className="">
                {items.map((item, index) => (
                    <CartItem key={index} item={item} />
                ))}
            </div>
            <div className={`p-3 pt-2 border-top bg-white ${isFooterFixed ? 'fixed-footer container' : ''}`}>
                <Row className="d-flex align-items-center p-3 border-bottom">
                    <Col md={12} className="d-flex align-items-center">
                        <div className='d-flex justify-content-end align-items-center w-100'>
                            <div style={{ marginRight: 80 }}>
                                <i className="bi bi-ticket-fill primary me-2"></i>
                                <span className='text-medium'>Sàn Voucher</span>
                            </div>
                            <Button variant="link" className="text-primary p-0">Chọn hoặc nhập mã</Button>
                        </div>
                    </Col>
                </Row>
                <Row className="align-items-center p-3">
                    <Col xs={6} md={6} className="d-flex align-items-center">
                        <Form.Check type="checkbox" className="checkbox-cart me-4" />
                        <span className='text-medium'>Chọn Tất Cả (32)</span>
                        <Button variant="link" className="ms-3 primary p-0">Xóa</Button>
                    </Col>
                    <Col xs={12} md={6} className="text-end mt-3 mt-md-0">
                        <div className='d-flex justify-content-end align-items-center w-100'>
                            <div className="text-medium me-4">
                                Tổng thanh toán (4 sản phẩm):
                                <span className="primary fw-bold ms-2">₫1.143.000</span>
                                <i className="bi bi-caret-up-fill ms-1"></i><br />
                                <div className="text-muted small">
                                    Tiết kiệm <span className="primary ms-1">₫141,444k</span>
                                </div>
                            </div>
                            {/* <Button variant="danger" className="btn-buy">Mua Hàng</Button> */}
                            <button  className="btn-buy button-flex button-hover background-primary text-large " style={{border:'none' }}>Đặt hàng</button>

                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default Cart;
