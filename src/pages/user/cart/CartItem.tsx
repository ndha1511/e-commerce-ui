import React, { useState } from 'react';
import { Row, Col, Form, Button, Dropdown, Image, Badge, Modal } from 'react-bootstrap';
import './cart-item.scss';

interface CartItemProps {
    item: {
        name: string;
        description: string;
        image: string;
        originalPrice: string;
        discountedPrice: string;
        quantity: number;
        totalPrice: string;
        variant: string;
        color: string;
        size: string;
    };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [selectedColor, setSelectedColor] = useState('Đen');
    const [selectedSize, setSelectedSize] = useState('44');

    const toggleOptions = () => setShowOptions(!showOptions);

    return (
        <div>
            <div className="cart-item border-bottom p-3 pl-3 pt-5 pr-3 pb-5 bg-white">
                <Row className="align-items-center">
                    <Col xs={12} md={4} className="d-flex align-items-center mb-3 mb-md-0">
                        <Form.Check type="checkbox" className="checkbox-cart me-3" />
                        <div className="d-flex align-items-center">
                            <Image src={item.image} fluid className="cart-item-image me-3" />
                            <div className="w-100">
                                <p>
                                    {item.description.split(" ").slice(0, 10).join(" ") + (item.description.split(" ").length > 10 ? "..." : "")}
                                </p>
                                <div className="variant-selector" style={{ position: 'relative', cursor: 'pointer' }}>
                                    <div className="selected-variant text-muted" onClick={toggleOptions}>
                                        <span>Phân Loại Hàng:</span>
                                        <i
                                            className={`bi ${showOptions ? 'bi-caret-up-fill' : 'bi-caret-down-fill'} ms-2`}
                                            style={{ transition: 'transform 0.3s ease-in-out' }}
                                        ></i>
                                        <br />
                                        <span>{selectedColor}, {selectedSize}</span>

                                    </div>

                                    {showOptions && (
                                        <div className="variant-options">
                                            <div className="options-container p-3 border bg-white">
                                                <Row className="mb-3">
                                                    <Col xs={4}><strong>Màu Sắc:</strong></Col>
                                                    <Col xs={8} className="d-flex justify-content-between">
                                                        <Button
                                                            variant={selectedColor === 'Đen' ? 'danger' : 'outline-secondary'}
                                                            className={`variant-button ${selectedColor === 'Đen' ? 'selected' : ''}`}
                                                            onClick={() => setSelectedColor('Đen')}
                                                        >
                                                            Đen
                                                        </Button>
                                                        <Button
                                                            variant={selectedColor === 'Xám' ? 'danger' : 'outline-secondary'}
                                                            className={`variant-button ${selectedColor === 'Xám' ? 'selected' : ''}`}
                                                            onClick={() => setSelectedColor('Xám')}
                                                        >
                                                            Xám
                                                        </Button>
                                                    </Col>
                                                </Row>

                                                <Row className="mb-3">
                                                    <Col xs={4}><strong>Kích Thước:</strong></Col>
                                                    <Col xs={8} className="d-flex justify-content-between flex-wrap">
                                                        {['40', '41', '42', '43', '44'].map(size => (
                                                            <Button
                                                                key={size}
                                                                variant={selectedSize === size ? 'danger' : 'outline-secondary'}
                                                                className={`variant-button ${selectedSize === size ? 'selected' : ''}`}
                                                                onClick={() => setSelectedSize(size)}
                                                            >
                                                                {size}
                                                            </Button>
                                                        ))}
                                                    </Col>
                                                </Row>

                                                <div className="d-flex justify-content-between mt-4">
                                                    <Button variant="light" onClick={() => setShowOptions(false)}>
                                                        TRỞ LẠI
                                                    </Button>
                                                    <Button variant="danger" onClick={() => setShowOptions(false)}>
                                                        XÁC NHẬN
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col xs={6} md={2} className="text-center mb-3 mb-md-0">
                        <p className="text-muted mb-1"><s>{item.originalPrice} đ</s></p>
                        <p className="text-danger fw-bold mb-1">{item.discountedPrice} đ</p>
                    </Col>
                    <Col xs={6} md={2} className="text-center mb-3 mb-md-0">
                        <div className="d-flex justify-content-center align-items-center">
                            <Button variant="light" size="sm">-</Button>
                            <span className="px-3">{item.quantity}</span>
                            <Button variant="light" size="sm">+</Button>
                        </div>
                    </Col>
                    <Col xs={6} md={2} className="text-center mb-3 mb-md-0">
                        <p className="text-danger fw-bold mb-1">{item.totalPrice} đ</p>
                    </Col>
                    <Col xs={6} md={2} className="text-end d-flex justify-content-center align-items-center flex-column">
                        <Button variant="link" className="text-danger p-0">Xóa</Button>
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="link" className="text-muted p-0">
                                Tìm sản phẩm tương tự
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#">Sản phẩm tương tự 1</Dropdown.Item>
                                <Dropdown.Item href="#">Sản phẩm tương tự 2</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </div>
            <div className="mb-3">
                <Row className="align-items-center">
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
            </div>
        </div>
    );
};

export default CartItem;
