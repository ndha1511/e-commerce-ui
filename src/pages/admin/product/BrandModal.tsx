import React, { ChangeEvent, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { pageQueryHanlder } from "../../../utils/query-handler";
import SimpleBar from "simplebar-react";
import SkeltetonWrapper from "../../../components/query-wrapper/SkeletonWrapper";
import useDebounce from "../../../hooks/useDebounce";
import { useGetBrandsQuery } from "../../../services/brand.service";
import { Brand } from "../../../models/brand";
import { useSelector } from "react-redux";
import { RootState } from "../../../rtk/store/store";

interface ProductApplyProps {
    show: boolean;
    handleClose: () => void;
    selectedBrand: { id: string; name: string };  // Mảng thương hiệu đã chọn
    handleCheckboxChange: (id: string, name: string) => void;  // Hàm xử lý chọn thương hiệu
}

const BrandModal: React.FC<ProductApplyProps> = ({ show, handleClose, selectedBrand, handleCheckboxChange }) => {
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [tempSelectedBrand, setTempSelectedBrand] = useState<{ id: string; name: string }>({ id: '', name: '' }); // Biến tạm để lưu thương hiệu chọn

    const debounce = useDebounce(searchKeyword, 300);

    // Lấy categoryId từ Redux
    const productRedux = useSelector((state: RootState) => state.product.categories);
    const categoryId = productRedux[productRedux.length - 1];

    // Cấu hình params cho API
    const params: string = pageQueryHanlder(1, 40, [
        { field: 'categories', operator: '=', value: categoryId },
        { field: 'brandName', operator: ':', value: debounce }
    ]);

    const { data } = useGetBrandsQuery(params);

    // Hàm xử lý khi chọn radio
    const handleRadioChange = (id: string, name: string) => {
        // Cập nhật giá trị thương hiệu chọn tạm thời
        setTempSelectedBrand({ id, name });
    };

    const handleSearchProduct = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    };

    const handleSave = () => {
        // Khi nhấn Save, gọi handleCheckboxChange với giá trị tạm thời
        if (tempSelectedBrand.id) {
            handleCheckboxChange(tempSelectedBrand.id, tempSelectedBrand.name);
        }
        handleClose();  // Đóng modal sau khi lưu
    };
    const clearSelection = () => {
        setTempSelectedBrand({ id: '', name: '' });
        handleCheckboxChange(tempSelectedBrand.id, tempSelectedBrand.name);
    };
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <div className="text-medium">Danh sách thương hiệu</div>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className="search-list-product p-2 pe-3 w-100">
                        <input
                            className="input-search-list-product"
                            value={searchKeyword}
                            onChange={handleSearchProduct}
                            placeholder="Nhập từ khóa tìm kiếm"
                            type="text"
                        />
                        <i className="bi bi-search"></i>
                    </div>
                    <SkeltetonWrapper queriesStatus={[data ? true : false]} skCount={4} skHeight={100}>
                        <SimpleBar style={{ height: 400, marginTop: 10 }}>
                            {data?.data.items && data?.data.items.length <= 0 ? (
                                <div className="text-center mt-5 text-medium">Không tìm thấy!</div>
                            ) : (
                                <>
                                    {data?.data.items.map((item: Brand) => (
                                        <div
                                            className="d-flex p-3 border-bottom gap-3 align-items-center cursor-pointer"
                                            key={item.id}
                                        >
                                            <input
                                                type="radio"
                                                className="form-check-input no-shadow"
                                                style={{ marginRight: "10px" }}
                                                checked={tempSelectedBrand.id ? tempSelectedBrand.id === item.id : selectedBrand.id === item.id}
                                                onChange={() => handleRadioChange(item.id, item.brandName)}  // Cập nhật khi chọn
                                                name="brandRadio"  // Đảm bảo chỉ chọn được 1 thương hiệu
                                            />
                                            <img
                                                src={item.image}
                                                width={60}
                                                style={{ borderRadius: '50%' }}
                                                height={60}
                                                alt=""
                                            />
                                            <div className="d-flex flex-column gap-1">
                                                <span>{item.brandName}</span>
                                                <span className="primary">{item.description}</span>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </SimpleBar>
                    </SkeltetonWrapper>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={clearSelection}>
                    Xóa chọn
                </Button>
                <Button variant="light" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleSave}>  {/* Gọi handleSave khi click Save */}
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BrandModal;
