import { Button, Modal } from "react-bootstrap";
import { ProductOrder } from "../../../../models/product-order";
import Rating from "../../../../components/rating/Rating";
import React from "react";

interface Props {
    show: boolean;
    handleClose: () => void;
    product: ProductOrder;
    orderId: string;
}

const FormComment = ({ show, handleClose, product, orderId }: Props) => {
    const [star, setStar] = React.useState(0);

    const clickStar = (star: number) => {
        setStar(star);
    }
    return (<Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
            <h6>Đánh giá sản phẩm</h6>
        </Modal.Header>
        <Modal.Body>
            <div>
                <h6>Bạn cảm thấy sản phẩm này như thế nào</h6>
                <div className="d-flex gap-3 align-items-center">
                    <img src={product.image} width={100} height={100} />
                    <span>{product.productName}</span>
                    <span>Phân loại: {product.attributes}</span>
                </div>
                <Rating variant="warning" size="text-large" star={star} setStar={clickStar}/>
                <div>
                    <textarea placeholder="Nhập đánh giá của bạn" rows={5} cols={50}></textarea>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Đóng
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Gửi đánh giá
            </Button>
        </Modal.Footer>
    </Modal>)
}

export default FormComment;