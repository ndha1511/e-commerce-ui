import { useState } from 'react';
import { Card, Col, Image, Pagination, ProgressBar, Row } from "react-bootstrap";
import './comment.scss';
import Rating from '../../../components/rating/Rating';

const Comment = () => {
    const totalReviews = 16;
    const ratings = [
        { stars: 5, count: 13 },
        { stars: 4, count: 2 },
        { stars: 3, count: 0 },
        { stars: 2, count: 1 },
        { stars: 1, count: 0 },
    ];

    const averageRating = 4.7;

    const [selectedFilter, setSelectedFilter] = useState('Tất Cả');

    const filters = [
        { label: 'Tất Cả', count: null },
        { label: '5 Sao', count: '8,9k' },
        { label: '4 Sao', count: 653 },
        { label: '3 Sao', count: 263 },
        { label: '2 Sao', count: 94 },
        { label: '1 Sao', count: 196 },
        { label: 'Có Bình Luận', count: '3,6k' },
        { label: 'Có Hình Ảnh / Video', count: '1,3k' }
    ];

    const handleFilterClick = (filterLabel: string) => {
        setSelectedFilter(filterLabel);
    };
    const reviews = [
        {
            userAvatar: "https://via.placeholder.com/64",
            userName: "5ult89dga0",
            rating: 5,
            reviewDate: "2023-03-15 22:45",
            productDetails: "Đen, M",
            reviewText: "Sp đúng quảng cáo Shop giao hàng siêu nhanh, đóng gói kỹ Áo đẹp, vải mềm, ko nóng, thơm, không có chỉ thừa, may cẩn thận lắm nha Minh m58 - 52 kg mặc XXL qua mông, mặc thoải mái luôn NÊN MUA NHAAA :3 Shop tư vấn nhiệt tình, SP tốt cho shop 5 sao.",
            reviewImages: [
                "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp",
                "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp",
                "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp",
                "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp"
            ],
            sellerResponse: "Shop chân thành cảm ơn đánh giá của anh chị về shop. Shop rất vui khi được tư vấn cho anh chị về sản phẩm bên shop. Shop mong rằng sẽ được phục vụ bạn trong lần tới. Chúc anh chị sức khỏe"
        },
        {
            userAvatar: "https://via.placeholder.com/64",
            userName: "5ult89dga0",
            rating: 5,
            reviewDate: "2023-03-15 22:45",
            productDetails: "Đen, M",
            reviewText: "Sp đúng quảng cáo Shop giao hàng siêu nhanh, đóng gói kỹ Áo đẹp, vải mềm, ko nóng, thơm, không có chỉ thừa, may cẩn thận lắm nha Minh m58 - 52 kg mặc XXL qua mông, mặc thoải mái luôn NÊN MUA NHAAA :3 Shop tư vấn nhiệt tình, SP tốt cho shop 5 sao.",
            reviewImages: [
                "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp",
                "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp",
                "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp",
                "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp"
            ],
            sellerResponse: "Shop chân thành cảm ơn đánh giá của anh chị về shop. Shop rất vui khi được tư vấn cho anh chị về sản phẩm bên shop. Shop mong rằng sẽ được phục vụ bạn trong lần tới. Chúc anh chị sức khỏe"
        }, {
            userAvatar: "https://via.placeholder.com/64",
            userName: "5ult89dga0",
            rating: 5,
            reviewDate: "2023-03-15 22:45",
            productDetails: "Đen, M",
            reviewText: "Sp đúng quảng cáo Shop giao hàng siêu nhanh, đóng gói kỹ Áo đẹp, vải mềm, ko nóng, thơm, không có chỉ thừa, may cẩn thận lắm nha Minh m58 - 52 kg mặc XXL qua mông, mặc thoải mái luôn NÊN MUA NHAAA :3 Shop tư vấn nhiệt tình, SP tốt cho shop 5 sao.",
            reviewImages: [
                "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp",
                "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp",
                "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp",
                "https://salt.tikicdn.com/cache/280x280/ts/product/69/bf/e9/45164f5d8f4ef134197f2bb5aca85a5c.jpg.webp"
            ],
            sellerResponse: "Shop chân thành cảm ơn đánh giá của anh chị về shop. Shop rất vui khi được tư vấn cho anh chị về sản phẩm bên shop. Shop mong rằng sẽ được phục vụ bạn trong lần tới. Chúc anh chị sức khỏe"
        },
    ];
    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <div className='bg-white p-3  border-radius-medium mt-3'>
            <div className='ms-2 mt-1'> <h6>Khách hàng đánh giá</h6></div>
            <div className='p-3'>
                <Row className='row-rt'>
                    <Col md={4} className="">
                        <div>
                            <div className="d-flex align-items-center">
                                <h2 className="mb-0">{averageRating}</h2>
                                <div className="ms-2">
                                    {[...Array(5)].map((_, index) => (
                                        <span style={{ fontSize: 30 }} key={index} className="text-warning">&#9733;</span>
                                    ))}
                                </div>
                            </div>
                            <p className="mb-2 text-muted">({totalReviews} đánh giá)</p>
                            {ratings.map((rating, index) => (
                                <div key={index} className="d-flex align-items-center mb-1">
                                    <div className="me-2" style={{ width: '20%' }}>
                                        {[...Array(rating.stars)].map((_, starIndex) => (
                                            <span key={starIndex} className="text-warning">&#9733;</span>
                                        ))}
                                        {[...Array(5 - rating.stars)].map((_, starIndex) => (
                                            <span key={starIndex} className="text-muted">&#9733;</span>
                                        ))}
                                    </div>
                                    <div className="w-100">
                                        <ProgressBar
                                            now={(rating.count / totalReviews) * 100}
                                            variant="danger"
                                            style={{ height: '10px',marginTop:8, marginLeft:6 }}
                                        />
                                    </div>
                                    <div className="ms-2">{rating.count}</div>
                                </div>
                            ))}
                        </div>
                    </Col>
                    <Col md={8} className=" ">
                        <Row className="row-center">
                            {filters.map((filter, index) => (
                                <Col key={index} xs={6} md={3} className="mb-2 ">
                                    <button
                                        onClick={() => handleFilterClick(filter.label)}
                                        className={`w-100 btn-comment border-radius-small bg-white p-1 d-flex align-items-center justify-content-center ${selectedFilter === filter.label ? 'selected' : ''}`}
                                    >
                                        {filter.label} {filter.count && `(${filter.count})`}
                                    </button>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </div>
            {reviews.map((review, index) => (
                <Card key={index} style={{ border: 'none' }} className="mb-1">
                    <Card.Body>
                        <Row className="align-items-center">
                            <Col className="">
                                <div className='d-flex gap-3'>
                                    <Image
                                        src={review.userAvatar}
                                        roundedCircle
                                        alt="User avatar"
                                    />
                                    <div>
                                        <h6 className="mb-0">{review.userName}</h6>
                                        <div className="d-flex align-items-center">
                                            <Rating variant='warning' star={review.rating} />
                                        </div>
                                        <small className="text-muted">
                                            {review.reviewDate} | Phân loại hàng: {review.productDetails}
                                        </small>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Card.Text className="mt-2">
                            {review.reviewText}
                        </Card.Text>
                        <div className="d-flex gap-3">
                            {review.reviewImages.map((img, imgIndex) => (
                                <div key={imgIndex} className="">
                                    <Image className='img-cm' src={img} thumbnail />
                                </div>
                            ))}
                        </div>
                        <div className="bg-light p-3 mt-3 custom-background">
                            <span>Phản Hồi Của Người Bán</span>
                            <Card.Text className='text-muted'>
                                {review.sellerResponse}
                            </Card.Text>
                        </div>
                    </Card.Body>
                    <hr />
                </Card>
            ))}
            <div className='w-100 d-flex justify-content-end '>
                <Pagination>{items}</Pagination>
            </div>

        </div>
    );
}

export default Comment;
