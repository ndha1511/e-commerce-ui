import Skeleton from "react-loading-skeleton";
import QueryWrapper from "../query-wrapper/QueryWrapper";
import { ListProductProps } from "../types";
import ProductCard from "./ProductCard";

const SkeletonCustom: React.FC = () => {
    const components = Array.from({ length: 10 }, (_, i) => i + 1);
    return <div className="products">
        {components.map((index) => <Skeleton key={index} className="card-container-size" style={{
            height: "300px"
        }}/>)}
    </div>
}

const ListProduct: React.FC<ListProductProps> = (props) => {
    const { products } = props;
    return <QueryWrapper queriesStatus={[products ? true : false]} skeleton={SkeletonCustom}>
        <div className="products">
            {products?.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
    </QueryWrapper>
}
export default ListProduct;