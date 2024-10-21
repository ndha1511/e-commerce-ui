import { Collapse } from "react-bootstrap";
import { Order, OrderStatus, PaymentStatus } from "../../../../models/order";
import { convertPrice } from "../../../../utils/convert-price";
import React from "react";
import { ProductOrder } from "../../../../models/product-order";
import { PaymentMethod } from "../../../../dtos/request/payment/order-request";
import { useLazyGetPaymentQuery } from "../../../../services/payment.service";
import { useConfirmReceivedMutation } from "../../../../services/order.service";
import ModalLoading from "../../../../components/loading/ModalLoading";
import FormComment from "./FormComment";

const ProductItem = ({ product, orderId }: { product: ProductOrder, orderId: string }) => {
    const [showFormComment, setShowFormComment] = React.useState(false);
    const handleClose = () => {
        setShowFormComment(false);
    }
    return <>
        <tr>
            <td>
                <img src={product.image} width={100} height={100} />
            </td>
            <td>
                <span>{product.productName}</span>
            </td>
            <td>
                <div>{product.attributes.map((attr, idx) =>
                (
                    <div key={idx}>
                        <span>{attr}</span>
                    </div>
                ))}</div>
            </td>
            <td>{convertPrice(product.price)}</td>
            <td>{product.quantity}</td>
            <td>{convertPrice(product.amount)}</td>
            {(product.allowComment && !product.commented) && <td><button onClick={() => setShowFormComment(true)}>Đánh giá sản phẩm</button></td>}
        </tr>
        {showFormComment && <FormComment orderId={orderId} show={showFormComment} handleClose={handleClose}  product={product}/>}
    </>


}

const PurchaseItem = ({ item, refetch }: { item: Order, refetch: () => void }) => {
    const [getUrlPayment] = useLazyGetPaymentQuery();
    const [open, setOpen] = React.useState(false);
    const [confirmReceived, { isLoading: confirmLoading }] = useConfirmReceivedMutation();
    const handlerPayment = async () => {
        try {
            const result = await getUrlPayment({
                orderId: item.id,
                amount: item.finalAmount
            }).unwrap();
            location.href = result.data;
        } catch (error) {
            console.log(error);
        }
    }
    const updatePurchase = async (orderStatus: OrderStatus) => {
        try {
            switch (orderStatus) {
                case OrderStatus.RECEIVED:
                    await confirmReceived(item.id);
                    refetch();
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    }
    return <>
        <tr>
            <td>{item.id}</td>
            <td>{new Date(item.createdAt).toLocaleString()}</td>
            <td>
                {item.paymentMethod === PaymentMethod.COD ? "Thanh toán khi nhận hàng" :
                    item.paymentStatus === PaymentStatus.UNPAID ? <button onClick={handlerPayment}>Thanh toán</button> : "Đã thanh toán"}
            </td>
            <td>{convertPrice(item.finalAmount)}</td>

            <td>
                <div className="d-flex">
                    <div onClick={() => setOpen(prev => !prev)}>
                        {open ? <i className="bi bi-chevron-up btn-pointer"></i> : <i className="bi bi-chevron-down btn-pointer"></i>}
                    </div>
                    {(item.orderStatus === OrderStatus.PENDING) && <button>Hủy đơn hàng</button>}
                    {(item.orderStatus === OrderStatus.SHIPPED_CONFIRMATION) && <button onClick={() => updatePurchase(OrderStatus.RECEIVED)}>Đã nhận được hàng</button>}
                </div>
            </td>
        </tr>
        <Collapse in={open}>
            <div className="ps-3">
                <table className="table" align="center">
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Phân loại</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                            {(item.orderStatus === OrderStatus.RECEIVED) && <th></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {item.productOrders.map((p, idx) => (
                            <ProductItem orderId={item.id} product={p} key={idx} />
                        ))}
                        <tr>
                            <td colSpan={6} align="right" className="d-flex flex-column gap-2">
                                <span>Tổng tiền: {convertPrice(item.totalAmount)}</span>
                                <span>Phí vận chuyển: {convertPrice(item.shippingAmount)}</span>
                                <span>Giảm giá: {convertPrice(item.voucherAmount)}</span>
                                <span>Số tiền phải trả: {convertPrice(item.finalAmount)}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>

        </Collapse>
        {confirmLoading && <ModalLoading loading={confirmLoading} />}
    </>
}

export default PurchaseItem;