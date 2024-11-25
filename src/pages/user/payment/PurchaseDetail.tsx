import { Container } from "react-bootstrap";
import { isMobile } from "../../../utils/responsive";
import PurchaseItem from "./PurchaseItem";
import { convertPrice } from "../../../utils/convert-price";
import { useGetOrderByIdQuery } from "../../../services/order.service";
import { useLocation } from "react-router-dom";




function PuchaseDetail() {
    const mobile = isMobile();
    const location = useLocation();
    const newOrder = location.state?.id
    const { data } = useGetOrderByIdQuery(newOrder);
    return (
        <Container className=" d-flex flex-column shadow-container mb-4">
            <div className='d-flex  align-items-center border-bottom p-3'>
                <span style={{ fontSize: 16 }} >Sản Phẩm</span>
            </div>
            <div id="cart-items" className="">
                {
                    data?.data.productOrders.map((item) => (
                      <div key={item.productId}>
                          <PurchaseItem
                            item={item}
                            


                        />
                      </div>
                    ))
                }
            </div >
            <div className="d-flex flex-column gap-3 p-3 align-items-end">
                <div className="d-flex pe-3 align-items-center gap-2">
                    <span>Thành tiền: </span>
                    <p className="primary fw-bold mb-1 text-large">{convertPrice(data?.data.finalAmount)}</p>
                </div>
                <div className={`d-flex gap-3 ${mobile ? 'w-75': 'w-25'}`}>
                    <button className="btn-payment-success">Hủy đơn hàng</button>
                    <button className="btn-payment-success">Liên hệ chủ shop</button>
                </div>
            </div>
        </Container>
    );
}

export default PuchaseDetail;