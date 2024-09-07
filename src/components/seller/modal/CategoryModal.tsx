import { faAngleRight, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  Col, Modal, Row } from "react-bootstrap";
import './category-modal.scss'
import { useState } from "react";
import SimpleBar from 'simplebar-react';


type CategoryModalProps = {
    show: boolean;
    handleClose: () => void;
}
const categories = [
    { id: 1, categoryName: 'Thời trang nữ' },
    { id: 2, categoryName: 'Thời trang nam' },
    { id: 3, categoryName: 'Sắc đẹp' },
    { id: 4, categoryName: 'Sức khỏe' },
    { id: 5, categoryName: 'Dày dép nam' },
    { id: 6, categoryName: 'Trang sức' },
    { id: 7, categoryName: 'Phụ kiện' },
    { id: 8, categoryName: 'Điện thoại' },
    { id: 9, categoryName: 'Đồ điện tử' },
    { id: 10, categoryName: 'Thời trang nữ' },
    { id: 11, categoryName: 'Thời trang nam' },
    { id: 12, categoryName: 'Sắc đẹp' },
    { id: 13, categoryName: 'Sức khỏe' },
    { id: 14, categoryName: 'Dày dép nam' },
    { id: 15, categoryName: 'Trang sức' },
    { id: 16, categoryName: 'Phụ kiện' },
    { id: 17, categoryName: 'Điện thoại' },
    { id: 18, categoryName: 'Đồ điện tử' },

]
function CategoryModal({ show, handleClose }: CategoryModalProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedCategoryItems, setSelectedCategoryItems] = useState<string | null>(null);
    const [categoryItems, setCategoryItems] = useState<string | null>(null);

    const handleSelectCategory = (categoryName: string) => {
        setSelectedCategory(categoryName);
        setSelectedCategoryItems(categoryName)

    };
    const handleSelectCategoryItem = (categoryName: string) => {
        setSelectedCategoryItems(categoryName)
        setCategoryItems(categoryName)
    }
    return (
        <Modal show={show} onHide={handleClose} size="xl" centered>
            <Modal.Header closeButton>
                <Modal.Title><span className="text-large">Chỉnh sửa loại sản phẩm</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="bg-main container-fluid p-3">
                    <div className="pt-3">
                        <div className="search-category-modal ">
                            <input className="input-search-category-modal" placeholder="Nhập từ khóa tìm kiếm" type="text" />
                            <i className="bi bi-search"></i>
                        </div>
                    </div>
                    <Row className=" bg-main p-2 custom-row ">
                        <Col md={4} className=" bg-white col-modal-category">
                            <SimpleBar style={{ maxHeight: 300, marginTop: 10 }}>
                                {categories.map((category) => (
                                    <div key={category.id} style={{ width: '100%' }}>
                                        <div
                                            className={`btn-category-list p-1   pe-4 d-flex align-items-center justify-content-between w-100 ${selectedCategory === category.categoryName ? 'selected' : ''}`}
                                            onClick={() => handleSelectCategory(category.categoryName)}
                                            style={{ width: '100%' }}
                                        >
                                            <span className="ps-3">{category.categoryName}</span>
                                            <FontAwesomeIcon
                                                style={{ color: selectedCategory === category.categoryName ? 'red' : 'rgb(136, 136, 136)' }}
                                                icon={faChevronRight}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </SimpleBar>
                        </Col>
                        <Col md={4} className=" bg-white col-modal-category">
                            {selectedCategoryItems &&
                                <SimpleBar style={{ maxHeight: 300, marginTop: 10 }}>
                                    {categories.map((category) => (
                                        <div key={category.id} style={{ width: '100%' }}>
                                            <div
                                                className={`btn-category-list p-1   pe-4 d-flex align-items-center justify-content-between w-100 ${selectedCategory === category.categoryName ? 'selected' : ''}`}
                                                onClick={() => handleSelectCategoryItem(category.categoryName)}
                                                style={{ width: '100%' }}
                                            >
                                                <span className="ps-3">{category.categoryName}</span>
                                                <FontAwesomeIcon
                                                    style={{ color: selectedCategory === category.categoryName ? 'red' : 'rgb(136, 136, 136)' }}
                                                    icon={faChevronRight}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </SimpleBar>}
                        </Col>
                        <Col md={4} className=" bg-white bd-tr-radius-sm">
                            {categoryItems &&
                                <SimpleBar style={{ maxHeight: 300, marginTop: 10 }}>
                                    {categories.map((category) => (
                                        <div key={category.id} style={{ width: '100%' }}>
                                            <div
                                                className={`btn-category-list p-1   pe-4 d-flex align-items-center justify-content-between w-100 ${selectedCategory === category.categoryName ? 'selected' : ''}`}
                                                onClick={() => handleSelectCategoryItem(category.categoryName)}
                                                style={{ width: '100%' }}
                                            >
                                                <span className="ps-3">{category.categoryName}</span>
                                            </div>
                                        </div>
                                    ))}
                                </SimpleBar>}
                        </Col>

                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="w-100">
                    <div className="d-flex  justify-content-between align-items-center">
                        <div className="d-flex  justify-content-between align-items-center">
                            <span className="pe-2 text-medium text-muted">Đã chọn :</span>
                            <div className="d-flex   text-medium ">
                                <span>{selectedCategory ? selectedCategory : 'Chưa chọn loại sản phẩm'}</span>
                                <span >{categoryItems ?  <span><FontAwesomeIcon icon={faAngleRight} className="ms-1 me-1" />{selectedCategoryItems} </span>  : ''}</span>
                            </div>
                        </div>
                        <div className=" ">
                            <button  className="btn-category-modal-cancel" onClick={handleClose}>
                                Cancel
                            </button>
                            <button  className="btn-category-modal-active" onClick={handleClose}>
                                Confirm
                            </button>
                        </div>
                    </div>

                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default CategoryModal;