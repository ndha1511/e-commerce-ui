import { Dropdown, Table } from "react-bootstrap";
import { useGetProductsPageQuery } from "../../../services/product.service";
import { convertPrice } from "../../../utils/convert-price";
import React, { ChangeEvent, LegacyRef, ReactNode, useEffect, useState } from "react";
import useRedirect from "../../../hooks/useRedirect";
import './insert-product.scss';
import SimpleBar from "simplebar-react";
import { isMobile } from "../../../utils/responsive";
import useDebounce from "../../../hooks/useDebounce";
import SkeltetonWrapper from "../../../components/query-wrapper/SkeletonWrapper";
import PaginationComponent from "../../../components/pagination/PaginationComponent";
import useSearchCondition from "../../../hooks/useSearchCondition";
import QueryWrapper from "../../../components/query-wrapper/QueryWrapper";

function Product() {
    const mobile = isMobile();
    const redirect = useRedirect();
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const debounce = useDebounce(searchKeyword, 200)
    const {query, page, setPage, size, setSearch} = useSearchCondition(10);
    const { data: pageResponse, isFetching, isError } = useGetProductsPageQuery(query);
    const products = pageResponse?.data.items;
    const totalPages = pageResponse?.data.totalPage || 0; 

    useEffect(() => {
        setSearch([{
            field: "searchNames",
            operator: ":",
            value: debounce,
        }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounce])
   
    const handleSearchProduct = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    }
    return (
        <QueryWrapper queriesError={[isError]} queriesSuccess={[!isFetching]}>
        <div className=" bg-light p-3">
            <h5>Danh sách sản phẩm</h5>
            <div className="bg-white p-3 border-radius-small">
                <div className="mb-3  d-flex justify-content-between " >
                    <div className="d-flex gap-2  justify-content-between align-items-center w-100">
                        <div className="search-list-product p-2  ">
                            <input className="input-search-list-product"
                                value={searchKeyword} onChange={(e) => { handleSearchProduct(e) }}
                                placeholder="Tìm theo tên sản phẩm" type="text" />
                            <i className="bi bi-search"></i>
                        </div>
                        <div className=" d-flex justify-content-start gap-3    ">
                            <button onClick={() => redirect('/admin/product/create')} className="btn-save-all-products "  >Thêm sản phẩm</button>
                            <button onClick={() => redirect('/admin/product/import')} className="btn-save-all-products " >Nhập hàng</button>
                        </div>
                    </div>

                </div>

                <SimpleBar style={{ height: mobile ? 500 : 400 }}>
                    <SkeltetonWrapper queriesStatus={[!isFetching]} skCount={4} skHeight={100}>

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
                                        <td>{(page - 1) * size + index + 1}</td>
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
                                                    <Dropdown.Item onClick={() => redirect('attribute?id=' + product.id + '&name=' + product.productName)}>Phân loại</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Xóa</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>

                        </Table>
                    </SkeltetonWrapper>
                </SimpleBar>
                <PaginationComponent
                    currentPage={page}
                    totalPages={totalPages}
                    handlePageChange={(page) => setPage(page)}
                />
            </div>
        </div>
        </QueryWrapper>
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