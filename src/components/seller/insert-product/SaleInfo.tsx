import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import './sale-info.scss';
import AttributeSaleInfo from "./AttibuteSaleInfo";
import { useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../rtk/store/store";
import { setRegularPrice, setVariantDto } from "../../../rtk/slice/product-slice";



function SaleInfo() {

    const products = useSelector((state: RootState) => state.product)
    const variants = useSelector((state: RootState) => state.product.variantsDto)
    const dispatch = useDispatch();
    const [showAttributeSaleInfo, setShowAttributeSaleInfo] = useState(false);
    const [showAttributeSaleInfo1, setShowAttributeSaleInfo1] = useState(false);
    const [regularPrice, setRigularPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const [isApplyAll,setIsApplyAll] = useState<boolean>(true);
    const handleCloseAtribute = () => {
        setShowAttributeSaleInfo(false);
        setShowAttributeSaleInfo1(false);
    };
    const handleCloseAtribute1 = () => {
        setShowAttributeSaleInfo1(false);
    };

    const handleAddAttribute = () => {
        setShowAttributeSaleInfo(true);
    };
    const handleChange = (value: number) => {
        setRigularPrice(value);
        dispatch(setRegularPrice(value))
    }
    const handleChangeQuantity = (value: number) => {
        setQuantity(value);
    }
    const handleApplyAll = () => {
        const variantNew = [...variants].map((variant) => ({
            ...variant,
            price: regularPrice!==0 ? regularPrice : variant.price,
            quantity: quantity !== 0 ? quantity : variant.quantity,
        }));
        dispatch(setVariantDto(variantNew))
    }
    useEffect(()=>{
        if(regularPrice!==0 || quantity!==0){
            setIsApplyAll(false);
        }else{
            setIsApplyAll(true);
        }
    },[regularPrice,quantity])
    return (<div className="container-fluid">
        <div>
            <Row>
                {!showAttributeSaleInfo &&
                    <Col md={5} className=''>
                        <Row className="mb-3">
                            <Col md={3} className=' p-1 justify-content-end d-flex align-items-center'>
                                <span><span className='primary'>*</span>Phân loại hàng: </span>
                            </Col>
                            <Col md={9} className='p-1'>
                                <button className="btn-classify" onClick={handleAddAttribute}><FontAwesomeIcon icon={faPlus} /> Thêm nhóm phân loại</button>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={3} className=' p-1 justify-content-end d-flex align-items-center'>
                                <span><span className='primary'>*</span>Giá : </span>
                            </Col>
                            <Col md={9} className='p-1'>
                                <div className="select-search-sale-info" >
                                    <div className=" p-1 pe-2" style={{ borderRight: '2px solid rgb(241, 236, 236)' }}>
                                        <span >₫</span>
                                    </div>
                                    <input
                                        className="select-sale-info"
                                        placeholder="Vui lòng nhập"
                                        type="text"
                                    />

                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={3} className=' p-1 justify-content-end d-flex align-items-center'>
                                <span>Cân nặng : </span>
                            </Col>
                            <Col md={4} className='p-1'>
                                <div className="select-search-sale-info" >
                                    <input
                                        className="select-sale-info"
                                        placeholder="Vui lòng chọn"
                                        type="text"
                                    />
                                    <div className=" p-1 ps-2" style={{ borderLeft: '2px solid rgb(241, 236, 236)' }}>
                                        <span >gr</span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={3} className=' p-1 justify-content-end d-flex align-items-center'>
                                <span><span className='primary'>*</span>Kho hàng : </span>
                            </Col>
                            <Col md={9} className='p-1'>
                                <div className="select-search-sale-info" >
                                    <input
                                        className="select-sale-info"
                                        placeholder="Vui lòng nhập"
                                        type="text"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Col>}
                <Col md={`${showAttributeSaleInfo ? 12 : 7}`} className=''>
                    <Row>
                        <Col md={2} className="">
                            {showAttributeSaleInfo &&
                                <div className=' p-1 justify-content-end d-flex mt-2 '>
                                    <span><span className='primary'>*</span>Phân loại hàng: </span>
                                </div>
                            }
                        </Col>
                        <Col md={10}>
                            {showAttributeSaleInfo &&
                                <>
                                    <AttributeSaleInfo
                                        handleCloseAtribute={handleCloseAtribute}
                                        index={0}

                                    />
                                    <div className={`${showAttributeSaleInfo1 === false ? 'p-3' : ''} w-100 bg-light mt-3 border-radius-small `}>
                                        {showAttributeSaleInfo1 === false &&
                                            <button className="btn-classify w-25"
                                                onClick={() => { setShowAttributeSaleInfo1(true) }}>
                                                <FontAwesomeIcon icon={faPlus} /> Thêm phân loại 2</button>}
                                        {showAttributeSaleInfo1 &&
                                            <>
                                                <AttributeSaleInfo
                                                    handleCloseAtribute={handleCloseAtribute1}
                                                    index={1}

                                                />
                                            </>
                                        }
                                    </div>
                                </>
                            }
                        </Col>

                    </Row>
                    <Row className="mt-3">
                        <Col md={2} className="">
                            {showAttributeSaleInfo &&
                                <div className=' p-1 justify-content-end d-flex mt-2 '>
                                    <span className="text-end">Danh sách phân loại hàng : </span>
                                </div>
                            }
                        </Col>
                        <Col md={10}>
                            {showAttributeSaleInfo &&
                                <Row>
                                    <Col md={5} className="d-flex gap-4">
                                        <div className="select-search-sale-info" >
                                            <div className=" p-1 pe-2" style={{ borderRight: '2px solid rgb(241, 236, 236)' }}>
                                                <span >₫</span>
                                            </div>
                                            <input
                                                className="select-sale-info"
                                                placeholder="Giá nhập"
                                                type="text"
                                                value={products.regularPrice || ''}
                                                onChange={(e) => handleChange(Number(e.target.value))}
                                            />
                                        </div>
                                        <div className="select-search-sale-info" >
                                            <div className=" p-1 pe-2" style={{ borderRight: '2px solid rgb(241, 236, 236)' }}>
                                                <span >₫</span>
                                            </div>
                                            <input
                                                className="select-sale-info"
                                                placeholder="Giá bán"
                                                type="text"
                                                value={products.regularPrice || ''}
                                                onChange={(e) => handleChange(Number(e.target.value))}
                                            />
                                        </div>
                                    </Col>
                                    <Col md={2} className="d-flex">
                                        <div className="select-search-sale-info" >
                                            <input
                                                className="select-sale-info"
                                                placeholder="Cân nặng"
                                                type="text"
                                            />
                                            <div className=" p-1 ps-2" style={{ borderLeft: '2px solid rgb(241, 236, 236)' }}>
                                                <span >gr</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={2} className="d-flex">
                                        <div className="select-search-sale-info" >
                                            <input
                                                className="select-sale-info"
                                                placeholder="Kho hàng"
                                                type="text"
                                                onChange={(e) => handleChangeQuantity(Number(e.target.value))}
                                            />
                                        </div>
                                    </Col>
                                    <Col md={3} className="d-flex">
                                        <button disabled={isApplyAll} onClick={() => handleApplyAll()} className="btn-save-all-category">Áp dụng tất cả phân loại</button>
                                    </Col>
                                </Row>
                            }
                            {showAttributeSaleInfo && <ProductTable />}

                        </Col>
                    </Row>
                </Col>
            </Row>

        </div>
    </div>);
}

export default SaleInfo;