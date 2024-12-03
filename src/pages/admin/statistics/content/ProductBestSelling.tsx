import { ProductBestSellingProps } from "../types";

const ProductBestSelling: React.FC<ProductBestSellingProps> = (props) => {
    const { products } = props;
    return <>
        <span>Top sản phẩm bán chạy</span>
        <table>
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng bán</th>
                </tr>
            </thead>
            <tbody>
                {products.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td><img src={item.product.thumbnail} width={50} height={50} /></td>
                        <td>{item.product.productName}</td>
                        <td>{item.quantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
};

export default ProductBestSelling;