import { Table } from "react-bootstrap";
import { ProductBestSellingProps } from "../types";
import SimpleBar from "simplebar-react";

const ProductBestSelling: React.FC<ProductBestSellingProps> = (props) => {
  const { products } = props;
  return (
    <>
      <h6>
        Top sản phẩm bán chạy{" "}
        <span style={{ fontSize: 12 }}>({products.length})</span>
      </h6>
      <SimpleBar style={{ height: 800 }}>
        <Table className="mb-0 mt-2 table-bordered table-responsive custom-table-dashboard">
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
                <td>
                  <img src={item.product.thumbnail} width={50} height={50} />
                </td>
                <td>{item.product.productName}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </SimpleBar>
    </>
  );
};

export default ProductBestSelling;
