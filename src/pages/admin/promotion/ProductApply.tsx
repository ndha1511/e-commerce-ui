import React, { ChangeEvent, useState } from "react";
import { Button, Modal, } from "react-bootstrap";
import { pageQueryHanlder } from "../../../utils/query-handler";
import { useGetProductsPageQuery } from "../../../services/product.service";
import { convertPrice } from "../../../utils/convert-price";
import SimpleBar from "simplebar-react";
import SkeltetonWrapper from "../../../components/query-wrapper/SkeletonWrapper";
import useDebounce from "../../../hooks/useDebounce";
import { Product } from "../../../models/product";
interface ProductApplyProps {
    show: boolean;
    handleClose: () => void;
    selectedProducts: { id: string; productName: string }[]; 
    handleCheckboxChange: (id: string, productName: string, price: number) => void;
}
const ProductApply: React.FC<ProductApplyProps> = ({ show, handleClose, selectedProducts, handleCheckboxChange }) => {
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const debounce = useDebounce(searchKeyword, 300)
    const params: string = pageQueryHanlder(1, 40, [{ filed: 'searchNames', operator: ':', value: debounce }]);
    const { data, } = useGetProductsPageQuery(params);
    const handleSearchProduct = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    }
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <div className="text-medium">Danh sách sản phẩm </div>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className="search-list-product p-2 pe-3 w-100" >
                        <input className="input-search-list-product"
                            value={searchKeyword} onChange={(e) => { handleSearchProduct(e) }}
                            placeholder="Nhập từ khóa tìm kiếm" type="text" />
                        <i className="bi bi-search"></i>
                    </div>
                    <SkeltetonWrapper queriesStatus={[data ? true : false]} skCount={4} skHeight={100}>
                        <SimpleBar style={{ height: 400, marginTop: 10 }}>
                            {(data?.data.items && data?.data.items.length <= 0) ?
                                <><div className="text-center mt-5 text-medium">Không có sản phẩm phù hợp!</div></> :
                                <>
                                    {data?.data.items.map((item: Product) => (
                                        <div className="d-flex p-3 border-bottom gap-3 align-items-center cursor-pointer" key={item.id} 
                                         onClick={() => handleCheckboxChange(item.id, item.productName, item.regularPrice)}>
                                            <input
                                                type="checkbox"
                                                className="form-check-input no-shadow"
                                                style={{ marginRight: "10px" }}
                                                checked={selectedProducts.some(product => product.id === item.id)} // Kiểm tra xem sản phẩm đã được chọn chưa
                                                readOnly
                                            />
                                            <img src={item.thumbnail} width={60} height={60} alt="" />
                                            <div className="d-flex flex-column gap-1">
                                                <span>{item.productName}</span>
                                                <span className="primary">{convertPrice(item.regularPrice)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </>}

                        </SimpleBar>
                    </SkeltetonWrapper>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductApply;
