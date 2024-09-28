import { useState } from "react";
import { Badge, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { BsChatDots } from "react-icons/bs";
import ImageDetails from "../../../components/image-details/ImageDetails";
import Rating from "../../../components/rating/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import './product-detail.scss'
import Address from "../../../components/address/Address";
import Comment from "./Comment";

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

    const colors = [
        { name: "Trắng", img: "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp" },
        { name: "Đen", img: "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp" },
        { name: "Xanh", img: "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp" },
        { name: "Đỏ", img: "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp" },
        { name: "Tím ", img: "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp" },
        { name: "Vàng", img: "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp" }
    ];
    const sizes = ["3XL", "L", "M", "S", "XL", "XXL,3XL", "LA", "MA", "SA", "XLA", "XXL"];

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    const handleSizeClick = (size: any) => {
        setSelectedSize(size);
    };
    const handleColorClick = (colorName: any) => {
        setSelectedColor(colorName);
    };
    return (
        <Container className="mt-4 bg-light  border-radius-small">
            <div className="p-1 text-meidum d-flex gap-2 text-muted">
                <span className="me-2">Trang chủ <FontAwesomeIcon icon={faChevronRight} /></span>
                <span>Thời trang nam <FontAwesomeIcon icon={faChevronRight} /></span>
            </div>
            <Row className="align-center ">
                <Col md={4} className="">
                    <div className="border-radius-medium bg-white p-3" >
                        <div>  <ImageDetails images={images} /></div>
                    </div>

                </Col>
                <Col md={5} className=" ">
                    <div>
                        <div className="bg-white border-radius-medium p-3">
                            <div className="d-flex align-items-center mb-2">
                                <Badge bg="warning" className="me-2">Đổi ý 30 ngày</Badge>
                                <Badge bg="primary" className="me-2">Chính hãng</Badge>
                                <span className="text-muted">Thương hiệu: LADOS</span>
                            </div>
                            <h5 className="mb-1">Áo sơ mi nam trơn tay dài cao cấp Lados </h5>

                            <div className="d-flex gap-2 pt-2 pb-2 w-100 align-items-center">
                                <span className="text-medium">4.2</span>
                                <Rating size="text-medium" variant="secondary" star={4} />
                                <span className=" text-muted">(16)</span>
                                <span>|</span>
                                <span className=" text-muted">Đã bán 59</span>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <h4 className=" text-large mb-0">235.000₫</h4>
                                <small className=" ms-2 bg-light p-1 ps-2 pe-2 border-radius-medium">-4%</small>
                            </div>
                            <div className="mb-2">
                                <div className="p-2 border border-radius-small">
                                    <span className="text-medium">Giá sau khi giảm:</span> <br />
                                    <span className="text-large primary">225.000₫</span> <br />
                                    <FontAwesomeIcon color="blue" icon={faCheck} className="pe-2 ps-1 " />
                                    <span>Giảm 10.000₫ </span>
                                    <small className="text-muted">từ coupon của nhà bán</small>
                                </div>
                            </div>
                            <div className="mt-4">
                                <strong>Màu:</strong>
                                <Row className="p-2">
                                    {colors.map((color, index) => (
                                        <Col key={index} xs={3} className="p-1">
                                            <div className="btn-check-sc">
                                                <button
                                                    className={`w-100 btn-sc border-radius-small bg-white p-1 d-flex align-items-center justify-content-center ${selectedColor === color.name ? 'selected' : ''}`}
                                                    onClick={() => handleColorClick(color.name)}
                                                >
                                                    <div className="bg-light w-100">
                                                        <span className="pe-1">
                                                            <img src={color.img} style={{ width: 40, height: 40, marginBottom: 0 }} />
                                                        </span>
                                                        <span>{color.name}</span>
                                                    </div>
                                                </button>
                                                <div className={`check-sc ${selectedColor === color.name ? 'show-icon' : ''}`}>
                                                    <FontAwesomeIcon color="white" icon={faCheck} className="pe-2 ps-1 icon-check-size" />
                                                </div>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                            <div className="mb-3">
                                <strong>Size:</strong>
                                <Row className="p-2">
                                    {sizes.map((size, index) => (
                                        <Col key={index} xs={2} className="p-1">
                                            <div className="btn-check-sc">
                                                <button
                                                    className={`w-100 btn-sc border-radius-small bg-white p-1 d-flex align-items-center justify-content-center ${selectedSize === size ? 'selected' : ''}`}
                                                    onClick={() => handleSizeClick(size)}
                                                >
                                                    <div className="bg-light w-100">
                                                        {size}
                                                    </div>
                                                </button>
                                                <div className={`check-sc ${selectedSize === size ? 'show-icon' : ''}`}>
                                                    <FontAwesomeIcon color="white" icon={faCheck} className="pe-2 ps-1 icon-check-size" />
                                                </div>
                                            </div>
                                        </Col>

                                    ))}
                                </Row>
                            </div>

                        </div>

                    </div>
                </Col>
                <Col md={3} >

                    <div className="d-flex justify-content-center border-radius-medium ">
                        <Card style={{ width: '100%', padding: '1rem', border: 'none' }}>
                            <Row>
                                <Col className="d-flex justify-content-between">
                                    <div className="d-flex align-items-center w-100 pb-2 border-bottom">
                                        <div className="d-flex align-items-center w-100 ">
                                            <img
                                                src="https://vcdn.tikicdn.com/cache/w100/ts/seller/4b/54/1a/f385a79a716cb3505f152e7af8c769aa.png.webp"
                                                alt="Product"
                                                className="img-fluid img-ft"
                                            />
                                            <div className="pe-4">
                                                <span className="fw bold">SOMINAM</span> <br />
                                                4.4  <i  className="bi bi-star-fill primary"></i>  <small>(720 đánh giá)</small>
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
                                            className="img-fluid img-ft"
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
                                    <span className="text-large">147.000₫</span>
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
                    <div className="bg-white mt-3 border-radius-medium p-1">
                        <Address />
                    </div>
                </Col>
            </Row>
          
            <Row>
                <Col md={9}>
                    <Comment />
                </Col>
                <Col md={3}>

                </Col>
            </Row>
            <Row>
                <Col md={9}>
                    <div className="mt-3 border-radius-medium ">
                        <div style={{ border: 'none' }} className="card border-radius-medium ">
                            <div className="card-body border-radius-medium ">
                                <h5 className="card-title">Thông tin chi tiết</h5>
                                <table className="table text-muted ">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Thương hiệu</th>
                                            <td>OEM</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Xuất xứ thương hiệu</th>
                                            <td>Việt Nam</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Chất liệu</th>
                                            <td>Cotton</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Xuất xứ (Made in)</th>
                                            <td>Việt Nam</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Sản phẩm có được bảo hành không?</th>
                                            <td>Không</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={9}>
                    <div className=" mt-3 border-radius-medium ">
                        <div style={{ border: 'none' }} className="card border-radius-medium ">
                            <div className="card-body border-radius-medium ">
                                <h5 className="card-title">Mô tả sản phẩm</h5>
                                <pre className="text-align-start">
                                    {` 
                                    1. Size: S, M, L, XL
                                    2. Kiểu dáng: Thun đen
                                    3. Phong cách: Nhập khẩu
                                    4. Màu sắc: Đen
                                    5. Công nghệ: Cotton
                                    6. Chất liệu: 100% cotton
                                    7. Kích thước: 80cm x 100cm x 25cm
                                    8. Trọng lượng: 150g
                                    9. Sản phẩm có thể khuyển mãi tại cửa hàng của chúng tôi
                                    10. Sản phẩm có thể đặt hàng tại cửa hàng của chúng tôi để nhận hàng tại`}
                                </pre>
                                <img
                                style={{display:'flex', flex:1}}
                                    src="https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp"
                                    alt="Product"
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

        </Container>
    );
}

export default ProductDetail;