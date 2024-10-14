import { Collapse, Form, Pagination, Table } from "react-bootstrap";
import './insert-product.scss'
import { useGetAttributeByIdQuery, useGetProductsQuery } from "../../../services/product.service";
import React from "react";
import { Product } from "../../../models/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
function ProductStock() {
    const { data } = useGetProductsQuery();
    const products = data?.data.items;
    return (
        <div className=" bg-light p-3">
            <div className=" d-flex justify-content-between">
                <h5>Kho Sản Phẩm</h5>
                <button className="btn-stock">Lịch sử tồn kho</button>
            </div>
            <div className="mt-3 mb-3 d-flex justify-content-between">
                <div className="search-list-product p-2 ">
                    <input className="input-search-list-product" placeholder="Nhập từ khóa tìm kiếm" type="text" />
                    <i className="bi bi-search"></i>
                </div>
                <div className="">
                    <Form.Select className="select-items no-shadow " >
                        <option>Lọc theo giá</option>
                        <option value="1">100 - 500</option>
                        <option value="2">500 - 1000</option>
                        <option value="3">1000 - 1500</option>
                    </Form.Select>
                </div>
            </div>
            <Table className='table-bordered table-responsive  custom-table-product-stock '>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>ẢNH ĐẠI DIỆN</th>
                        <th>TÊN SẢN PHẨM</th>
                        <th>SỐ LƯỢNG HÀNG TỒN</th>
                        <th>ĐÃ BÁN</th>
                        <th>TRẠNG THÁI</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((product) => (
                        <ProductStockItems key={product.id} product={product} />
                    ))}

                </tbody>
            </Table>
            <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        </div>
    );
}

export default ProductStock;

interface ProductStockItems {
    product: Product;
}
function ProductStockItems({ product }: ProductStockItems) {
    const [open, setOpen] = React.useState<boolean>(false);
    const { data } = useGetAttributeByIdQuery(product.id || '');
    console.log(data);
    const openCollapse = async () => {
        setOpen(!open);

    };
    return (
        <React.Fragment >
            <tr key={product.id}>
                <td>
                    {product.buyQuantity > 0 && (
                        <span onClick={openCollapse} className="text-primary text-large cursor-pointer">
                            {open ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                        </span>
                    )}
                </td>
                <td className="pt-1 pb-1"><img src={product.thumbnail} alt='anh' width={60} height={60} /></td>
                <td >{product.productName.length > 70 ? product.productName.slice(0, 70) + '...' : product.productName}</td>
                <td>{product.totalQuantity}</td>
                <td>{product.buyQuantity}</td>
                <td>{product.InActive ? 'Ngưng hoạt động' : 'Đang bán'}</td>
            </tr>
            <tr>
                <td colSpan={6} className="p-0">
                    <Collapse in={open}>
                        <div className=" p-3">
                            <Table className="mb-0 table-bordered table-responsive custom-table-category-cs ">
                                <thead>
                                    <tr className='text-center'>
                                        <th>{data?.data.attributes[0].attributeName}</th>
                                        <th>{data?.data.attributes[1].attributeName}</th>
                                        <th>SỐ LƯỢNG HÀNG TỒN</th>
                                        <th>ĐÃ BÁN</th>
                                        <th>TRẠNG THÁI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {data..map((item) => (
                                        <CategoryItem key={item.id} category={item} />
                                    ))} */}
                                    {data?.data.variants.map((variant) => (
                                      <tr>
                                          <td>
                                            <div>
                                                <img src="" alt="" />
                                                {variant.attributeValue1}
                                            </div>
                                          </td>
                                          <td>{variant.attributeValue2}</td>
                                      </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Collapse>
                </td>
            </tr>
        </React.Fragment>
    );
}
