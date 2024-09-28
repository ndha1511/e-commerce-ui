// ProductList.tsx
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ProductAttributeDto } from "../../../dtos/request/product/product-attribute.reques";
import { RootState } from "../../../rtk/store/store";

interface Attribute {
  attribute?: string[];
}

interface Size {
  size: string;
  price: number;
  stock: number;
}

interface Product {
  color: string;
  sizes: Size[];
}
interface ProductListProps {
  productList: Product[];
  addNewProduct: () => void;
}

const TableProduct: FC<ProductListProps & Attribute> = ({ productList, addNewProduct, attribute }) => {
  const productAttributeDto: ProductAttributeDto[] = useSelector((state: RootState) => state.product.attributesDto);
  return (
    <Row className="mt-3 custom-row p-3">
      <div>
        {productList.map((product, index) => (
          <div key={index} className="d-flex">
            <Col md={3} className="bd-tb">
              {index === 0 && (
                <div className="w-100 title-table bg-light p-2">
                  <span>{productAttributeDto && productAttributeDto.length > 0 && productAttributeDto[0].attributeName !== '' ? productAttributeDto[0].attributeName : 'Phân loại 1'}</span>
                </div>
              )}
              <div className="w-100 ttt p-2">
                <span>{product.color}</span>
              </div>
            </Col>
            <Col md={3} className="bd-tb">
              {index === 0 && (
                <div className="w-100 title-table bg-light p-2">
                  <span>{productAttributeDto && productAttributeDto.length > 1 ? productAttributeDto[1].attributeName : 'Phân loại 2'}</span>
                </div>
              )}
              {product.sizes.map((size) => (
                <div key={size.size} className="w-100 ttt bg-white p-2">
                  <span>{size.size}</span>
                </div>
              ))}
            </Col>
            <Col md={3} className="bd-tb">
              {index === 0 && (
                <div className="w-100 title-table bg-light p-2">
                  <span>Giá</span>
                </div>
              )}
              {product.sizes.map((size) => (
                <div key={size.size} className="w-100 bg-white ttt p-3">
                  <div className="select-search-sale-info">
                    <div
                      className="p-1 pe-2"
                      style={{ borderRight: "2px solid rgb(241, 236, 236)" }}
                    >
                      <span>₫</span>
                    </div>
                    <input
                      className="select-sale-info"
                      style={{ padding: 0, paddingLeft: 10 }}
                      placeholder="Giá"
                      type="text"
                      value={size.price}
                      readOnly
                    />
                  </div>
                </div>
              ))}
            </Col>
            <Col md={3} className="bd-tb">
              {index === 0 && (
                <div className="w-100 title-table bg-light p-2">
                  <span>Kho hàng</span>
                </div>
              )}
              {product.sizes.map((size) => (
                <div key={size.size} className="w-100 ttt bg-white p-2">
                  <div className="select-search-sale-info">
                    <input
                      className="select-sale-info"
                      style={{ padding: 5, paddingLeft: 10 }}
                      placeholder="Kho hàng"
                      type="text"
                      value={size.stock}
                      readOnly
                    />
                  </div>
                </div>
              ))}
            </Col>
          </div>
        ))}
        <button onClick={addNewProduct}>test</button>
      </div>
    </Row>
  );
};

export default TableProduct;
