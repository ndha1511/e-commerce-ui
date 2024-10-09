import { Dropdown, Pagination, Table } from "react-bootstrap";
import { useGetProductsQuery } from "../../../services/product.service";
import { convertPrice } from "../../../utils/convert-price";
import React, { LegacyRef, ReactNode } from "react";
import useRedirect from "../../../hooks/useRedirect";

function Product() {
    const { data: pageResponse } = useGetProductsQuery();
    const products = pageResponse?.data.items;
    console.log(products)
    const redirect = useRedirect();
    return (
        <div className="border p-3">

            <Table className='table-bordered table-responsive  custom-table-product '>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá bán</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td className="pt-1 pb-1"><img src={product.thumbnail} alt='anh' width={60} height={60} /></td>
                            <td >{product.productName.length > 70 ? product.productName.slice(0, 70) + '...' : product.productName}</td>
                            <td>{convertPrice(product.regularPrice)}</td>
                            <td>
                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle}>
                                        <i className="bi bi-three-dots"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Chỉnh sửa</Dropdown.Item>
                                        <Dropdown.Item onClick={()=>redirect('attribute?id='+product.id+'&name='+ product.productName )}>Phân loại</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Xóa</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
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
const CustomToggle = React.forwardRef(({ children, onClick }: { children: ReactNode, onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void }, ref: LegacyRef<HTMLAnchorElement>) => (
    <a
        href="/"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        className="avatar-dropdown" // Thêm class cho avatar dropdown
    >
        {children}
    </a>
));
export default Product;