import { Col, Row } from "react-bootstrap";
import './insert-product.scss'
import { useState } from "react";
import BtnGroup from "../../../components/seller/insert-product/BtnGroup";
import ImgAndVideo from "../../../components/seller/insert-product/ImgAndVideo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import CategoryModal from "../../../components/seller/modal/CategoryModal";




function InsertProduct() {
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const handleCloseCategoryModal =()=>{
        setShowCategoryModal(false);
    }
    const handleOpenCategoryModal =()=>{
        setShowCategoryModal(true);
    }
    return (
        <div className="w-100 container-fluid">
            <Row>
                <Col md={3} className="border">
                    menu
                </Col>
                <Col md={9} className="border bg-light p-3">
                    <BtnGroup />
                    <div className="bg-white p-4 border-radius-medium" style={{ width: '95%' }}>
                        <h4>Thông tin cơ bản</h4>
                        <ImgAndVideo />
                        <div className="d-flex flex-column gap-4"> <Row>
                            <Col md={2} className="text-end">
                                <div className="mt-2"> <span><span className="primary">*</span> Tên sản phẩm</span></div>
                            </Col>
                            <Col md={10}>
                                <input className="input-basic-information-seller" placeholder="Tên sản phẩm + Thương hiệu + Model" type="text" />
                            </Col>
                        </Row>
                            <Row>
                                <Col md={2} className="text-end">
                                    <div className="mt-2"><span><span className="primary" >*</span> Ngành hàng</span></div>
                                </Col>
                                <Col md={10}>

                                    <div className="category-seller" onClick={handleOpenCategoryModal}>
                                        <input readOnly className="input-basic-information-seller" placeholder="Chọn ngành hàng" type="text" />
                                        <FontAwesomeIcon  style={{position:'absolute', right:20}} icon={faPen} />
                                    </div>

                                </Col>
                            </Row>
                            <Row>
                                <Col md={2} className="text-end">
                                    <div className="mt-2"><span><span className="primary">*</span> Mô tả sản phẩm</span></div>
                                </Col>
                                <Col md={10}>
                                    <textarea rows={8} cols={50} className="textarea-basic-information-seller" />
                                </Col>
                            </Row></div>
                    </div>

                </Col>
            </Row>
            <CategoryModal show={showCategoryModal} handleClose={handleCloseCategoryModal} />
        </div>
    );
}

export default InsertProduct;