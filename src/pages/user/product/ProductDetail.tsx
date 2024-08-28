import { useState } from "react";
import { Badge, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { BsChatDots } from "react-icons/bs";
import ImageDetails from "../../../components/image-details/ImageDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function ProductDetail() {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };
    const images = [
        {
            id: 1,
            original: "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp",
            thumbnail: "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp",
        },
        {
            id: 2,
            original: "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp",
            thumbnail: "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp",
        },
        {
            id: 3,
            original: "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp",
            thumbnail: "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp",
        },
        {
            id: 4,
            original: "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp",
            thumbnail: "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp",
        },
        {
            id: 5,
            original: "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp",
            thumbnail: "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp",
        },
        {
            id: 6,
            original: "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp",
            thumbnail: "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp",
        },
        {
            id: 7,
            original: "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp",
            thumbnail: "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp",
        },
        {
            id: 8,
            original: "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp",
            thumbnail: "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp",
        },
    ];

    return (
        <Container className="mt-4 bg-light p-3 border-radius-small">

            <Row className="align-center ">
                <Col md={4} className="border">
                    <div style={{}}>
                        <ImageDetails images={images} />
                    </div>

                </Col>
                <Col md={5} className="border p-3">
                    <div>
                        <h5 className="mb-1">Áo sơ mi nam trơn tay dài cao cấp Lados - 779 chất kate lụa mềm mát, thấm hút mồ hôi</h5>
                        <div className="d-flex align-items-center mb-2">
                            <Badge bg="warning" className="me-2">Đổi ý 30 ngày</Badge>
                            <Badge bg="primary" className="me-2">Chính hãng</Badge>
                            <span className="text-muted">Thương hiệu: LADOS</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                            <h4 className="text-danger mb-0">235.000₫</h4>
                            <small className="text-muted ms-2">-4%</small>
                        </div>
                        <div className="text-danger mb-2">
                            <strong>225.000₫</strong>
                        </div>
                        <small className="text-muted">Giảm 10.000₫ từ coupon của nhà bán</small>
                        <hr />
                        <div className="mb-3">
                            <strong>Màu:</strong>
                            <Row className="mt-2">
                                <Col xs={3} className="p-1">
                                    <Button variant="outline-primary" className="w-100 text-start">Trắng</Button>
                                </Col>
                                <Col xs={3} className="p-1">
                                    <Button variant="outline-secondary" className="w-100 text-start">Xanh biển</Button>
                                </Col>
                                <Col xs={3} className="p-1">
                                    <Button variant="outline-success" className="w-100 text-start">Xanh rêu</Button>
                                </Col>
                                <Col xs={3} className="p-1">
                                    <Button variant="outline-dark" className="w-100 text-start">Xám đậm</Button>
                                </Col>
                                <Col xs={3} className="p-1">
                                    <Button variant="outline-light" className="w-100 text-start">Xám nhạt</Button>
                                </Col>
                                <Col xs={3} className="p-1">
                                    <Button variant="outline-primary" className="w-100 text-start">Xanh đen</Button>
                                </Col>
                                <Col xs={3} className="p-1">
                                    <Button variant="outline-dark" className="w-100 text-start">Đen</Button>
                                </Col>
                            </Row>
                        </div>
                        <div className="mb-3">
                            <strong>Size:</strong>
                            <Row className="mt-2">
                                <Col xs={2} className="p-1">
                                    <Button variant="outline-primary" className="w-100">3XL</Button>
                                </Col>
                                <Col xs={2} className="p-1">
                                    <Button variant="outline-primary" className="w-100">L</Button>
                                </Col>
                                <Col xs={2} className="p-1">
                                    <Button variant="outline-primary" className="w-100">M</Button>
                                </Col>
                                <Col xs={2} className="p-1">
                                    <Button variant="outline-primary" className="w-100">S</Button>
                                </Col>
                                <Col xs={2} className="p-1">
                                    <Button variant="outline-primary" className="w-100">XL</Button>
                                </Col>
                                <Col xs={2} className="p-1">
                                    <Button variant="outline-primary" className="w-100">XXL</Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col md={3} className="border">
                    <div className="d-flex justify-content-center">
                        <Card style={{ width: '20rem', padding: '1rem' }}>
                            <Row>
                                <Col className="d-flex justify-content-between">
                                    <div className="d-flex align-items-center w-100 pb-2 border-bottom">
                                        <div className="d-flex align-items-center w-100 ">
                                            <img
                                                src="https://vcdn.tikicdn.com/cache/w100/ts/seller/4b/54/1a/f385a79a716cb3505f152e7af8c769aa.png.webp"
                                                alt="Product"
                                                className="img-fluid"
                                            />
                                            <div className="pe-4">
                                                <span className="fw bold">SOMINAM</span> <br />
                                                4.4  <i style={{ color: 'orange' }} className="bi bi-star-fill"></i>  <small>(720 đánh giá)</small>
                                            </div>
                                        </div>
                                        <div >
                                            <div className="border p-2 border-radius-small">
                                                <BsChatDots style={{ fontSize: 20 }} color="#f05d23" />
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    <div className="d-flex  ">
                                        <img
                                            src="https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp"
                                            alt="Product"
                                            className="img-fluid"
                                        />
                                        <div className="ps-1">
                                            <span>Sọc trắng đen</span> <br />
                                            <span>L</span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="d-flex justify-content-between align-items-center">
                                    <span>Số Lượng</span>
                                    <div>
                                        <Button variant="outline-secondary" onClick={decreaseQuantity}>-</Button>
                                        <Form.Control
                                            type="text"
                                            value={quantity}
                                            readOnly
                                            className="text-center"
                                            style={{ width: '3rem', display: 'inline-block', margin: '0 0.5rem' }}
                                        />
                                        <Button variant="outline-secondary" onClick={increaseQuantity}>+</Button>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="d-flex justify-content-between">
                                    <span>Tạm tính</span>
                                    <strong>147.000₫</strong>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    <Button variant="danger" className="w-100">Mua ngay</Button>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col>
                                    <Button variant="outline-primary" className="w-100">Thêm vào giỏ</Button>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ProductDetail;