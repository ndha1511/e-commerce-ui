import { useState } from "react";
import { Card, Col, Pagination, ProgressBar, Row } from "react-bootstrap";
import "./comment.scss";
import Rating from "../../../components/rating/Rating";
import { Comment, MediaType } from "../../../models/comment";
import Avatar from "../../../components/avatar/Avatar";
import { useReplyCommentMutation } from "../../../services/comment.service";
import { Product } from "../../../models/product";
import PaginationComponent from "../../../components/pagination/PaginationComponent";
import { formatRating } from "../../../utils/covert-rating";

const CommentComp = ({
  user,
  comments,
  product,
  handleFilterCommnet,
  currentPageComment,
  totalPages,
  handlePageChange,
}: {
  user: string;
  comments: Comment[];
  product: Product;
  handleFilterCommnet: (field: string, value: string) => void;
  currentPageComment: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}) => {
  const totalReviews = product.reviews;
  const [isReply, setIsReply] = useState<string | null>(null);
  const [textReply, setTextReply] = useState<string>("");
  const handleOpenReply = (commentId: string) => {
    setIsReply(isReply === commentId ? null : commentId);
  };
  const [reply] = useReplyCommentMutation();

  const handleChangeReply = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextReply(e.target.value);
  };

  const handleReply = async (commentId: string) => {
    const newFormData = new FormData();
    newFormData.append("content", textReply);
    try {
      await reply({
        commentId: commentId,
        formData: newFormData,
      });
      setIsReply(null);
    } catch (error) {
      console.error(error);
      alert("khoong thành công");
    }
  };
  const ratings = [
    {
      stars: 5,
      count: comments.filter((comment) => comment.rating === 5).length,
    },
    {
      stars: 4,
      count: comments.filter((comment) => comment.rating === 4).length,
    },
    {
      stars: 3,
      count: comments.filter((comment) => comment.rating === 3).length,
    },
    {
      stars: 2,
      count: comments.filter((comment) => comment.rating === 2).length,
    },
    {
      stars: 1,
      count: comments.filter((comment) => comment.rating === 1).length,
    },
  ];

  const [selectedFilter, setSelectedFilter] = useState("Tất Cả");
  const filters = [
    { field: "", value: "", label: "Tất Cả", count: null },
    { field: "rating", value: "5", label: "5 Sao", count: null },
    { field: "rating", value: "4", label: "4 Sao", count: null },
    { field: "rating", value: "3", label: "3 Sao", count: null },
    { field: "rating", value: "2", label: "2 Sao", count: null },
    { field: "rating", value: "1", label: "1 Sao", count: null },
    {
      field: "commentMedia",
      value: "null",
      label: "Có Bình Luận",
      count: null,
    },
    { field: "", value: "321", label: "Có Hình Ảnh / Video", count: null },
  ];

  const handleFilterClick = (filterLabel: string) => {
    setSelectedFilter(filterLabel);
  };

  const active = 2;
  const items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }
  // Tạo function renderRatingStars để xử lý việc hiển thị sao
  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const decimalPart = rating % 1;
    const stars = [];

    // Render full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} style={{ fontSize: 30 }} className="text-warning">
          &#9733;
        </span>
      );
    }

    // Render half star if part decimal >= 0.5
    if (decimalPart >= 0.5) {
      stars.push(
        <span key={fullStars} style={{ fontSize: 30 }} className="text-warning">
          &#9733;
        </span>
      );
    } else if (decimalPart > 0) {
      // Render partial star if part decimal > 0 but less than 0.5
      stars.push(
        <span key={fullStars} style={{ fontSize: 30 }} className="text-warning">
          &#9734;
        </span>
      );
    }

    // Render empty stars
    for (let i = stars.length; i < 5; i++) {
      stars.push(
        <span key={i} style={{ fontSize: 30 }} className="text-secondary">
          &#9734;
        </span>
      );
    }

    return stars;
  };

  // Cập nhật giá trị averageRating
  const averageRating = parseFloat(formatRating(product.rating));

  return (
    <div className="bg-white p-3  border-radius-medium mt-3">
      <div className="ms-2 mt-1">
        {" "}
        <h6>Khách hàng đánh giá</h6>
      </div>
      <div className="p-3">
        <Row className="row-rt">
          <Col md={4} className="">
            <div>
              <div className="d-flex align-items-center">
                <h2 className="mb-0">{averageRating}</h2>
                <div className="ms-2">
                  {" "}
                  <Rating
                    size="text-large"
                    variant="warning"
                    star={averageRating}
                  />
                </div>
              </div>
              <p className="mb-2 text-muted">
                ({totalReviews > 0 ? totalReviews : "Chưa có"} đánh giá)
              </p>
              {ratings.map((rating, index) => (
                <div key={index} className="d-flex align-items-center mb-1">
                  <div className="me-2" style={{ width: "20%" }}>
                    {[...Array(rating.stars)].map((_, starIndex) => (
                      <span key={starIndex} className="text-warning">
                        &#9733;
                      </span>
                    ))}
                    {[...Array(5 - rating.stars)].map((_, starIndex) => (
                      <span key={starIndex} className="text-muted">
                        &#9733;
                      </span>
                    ))}
                  </div>
                  <div className="w-100">
                    <ProgressBar
                      now={(rating.count / totalReviews) * 100}
                      variant="danger"
                      style={{ height: "10px", marginTop: 8, marginLeft: 6 }}
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
                    onClick={() => {
                      handleFilterClick(filter.label);
                      handleFilterCommnet(filter.field, filter.value);
                    }}
                    className={`w-100 btn-comment border-radius-small bg-white p-1 d-flex align-items-center justify-content-center ${
                      selectedFilter === filter.label ? "selected" : ""
                    }`}
                  >
                    {filter.label} {filter.count && `(${filter.count})`}
                  </button>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>

      {comments
        .slice()
        .reverse()
        .map((value, idx) => {
          return (
            <Card key={idx} style={{ border: "none" }} className="mb-1">
              <Card.Body>
                <Row className="align-items-center">
                  <Col className="">
                    <div className="d-flex align-items-start gap-1">
                      <Avatar
                        name={value?.user?.name || ""}
                        url={value?.user?.avatar}
                        hidenName={true}
                      />
                      <div>
                        <h6 className="mb-0">{value?.user?.username}</h6>
                        <div className="d-flex align-items-center">
                          <Rating variant="warning" star={value.rating} />
                        </div>
                        <small className="text-muted">
                          {value.commentDate.toString()} | Phân loại hàng:{" "}
                          {value.attributes}
                        </small>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Card.Text className="mt-2"></Card.Text>
                <div className="d-flex align-items-center gap-1">
                  <div className="d-flex flex-column gap-3">
                    {value.content}
                    <div className="d-flex gap-2">
                      {value.commentMedia?.map((img, imgIndex) => (
                        <div key={imgIndex} style={{ position: "relative" }}>
                          {img.mediaType === MediaType.IMAGE ? (
                            <img src={img.path} width={150} height={150} />
                          ) : (
                            <video
                              width={150}
                              height={150}
                              controls
                              src={img.path}
                            ></video>
                          )}
                          {value.commentMedia !== null &&
                            user === "admin@gmail.com" && (
                              <button
                                className={`${
                                  value.commentMedia === null
                                    ? "btn-reply"
                                    : "btn-reply1"
                                }`}
                                onClick={() => handleOpenReply(value.id)}
                              >
                                Phản hồi
                              </button>
                            )}
                        </div>
                      ))}
                    </div>
                  </div>
                  {value.commentMedia === null &&
                    user === "admin@gmail.com" && (
                      <button
                        className={`${
                          value.commentMedia === null
                            ? "btn-reply"
                            : "btn-reply1"
                        }`}
                        onClick={() => handleOpenReply(value.id)}
                      >
                        Phản hồi
                      </button>
                    )}
                </div>
                {isReply === value.id && (
                  <div className=" d-flex flex-column mt-4">
                    <div className="d-flex align-items-end">
                      <Avatar
                        name={value?.user?.name || ""}
                        url={value?.user?.avatar}
                      />
                      <input
                        onChange={(e) => handleChangeReply(e)}
                        type="text"
                        placeholder="Phản hồi"
                        className="input-reply"
                      />
                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-3">
                      <button
                        className="btn-cancel"
                        onClick={() => setIsReply(null)}
                      >
                        Hủy
                      </button>
                      <button
                        className="btn-send"
                        onClick={() => handleReply(value.id)}
                      >
                        Phản hồi
                      </button>
                    </div>
                  </div>
                )}
                {value.replyComment ? (
                  <div className="bg-light p-3 mt-3 custom-background">
                    <span>Phản Hồi Của Shop</span>
                    <Card.Text className="text-muted">
                      {value.replyComment}
                    </Card.Text>
                  </div>
                ) : (
                  <></>
                )}
              </Card.Body>
              <hr />
            </Card>
          );
        })}
      {comments.length > 0 && (
        <div className="w-100 d-flex justify-content-center ">
          <PaginationComponent
            currentPage={currentPageComment}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default CommentComp;
