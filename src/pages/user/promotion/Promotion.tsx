import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetProductByPromotionIdQuery, useGetPromotionQuery } from "../../../services/promotion.service";
import './promotion.scss'
import ListProduct from "../../../components/products/ListProduct";
function Promotion() {
    const {url} = useParams();
    const {data} = useGetPromotionQuery(url || '');
    const product = useGetProductByPromotionIdQuery(data?.data.id || '');

    return ( 
        <Container>
            <div className="mb-3">
               <Link className="link-all text-medium" to={"/"}>Trang chủ <i style={{ fontSize: 10 }} className="bi bi-chevron-right"></i></Link>
                <span className="text-medium text-muted">{data?.data.promotionName}</span>
            </div>
            <div className="mb-3">
                <img src={data?.data.image} className="banner-promotion mb-3" alt="" />
                <span>{data?.data.description}</span>
            </div>
            <div>
                <ListProduct products={product.data?.data} title={data?.data.promotionName} />
            </div>
        </Container>
     );
}

export default Promotion;