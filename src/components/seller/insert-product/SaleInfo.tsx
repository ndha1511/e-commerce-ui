import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import './sale-info.scss';
import useChangeFile from "../../../hooks/useChangeFile";
import AttributeSaleInfo from "./AttibuteSaleInfo";
import { useEffect, useState } from "react";
function SaleInfo() {

    const { previewUrls, handleFileChange } = useChangeFile(9, [], []);

    const [showAttributeSaleInfo, setShowAttributeSaleInfo] = useState(false);
    const [showAttributeSaleInfo1, setShowAttributeSaleInfo1] = useState(false);



    // Hàm để thêm sản phẩm mới vào danh sách
    const addNewProduct = () => {
        console.log('ádfasdfass')
        const newProduct = {
            color: 'Đỏ',
            sizes: [
                {
                    size: 'M',
                    price: 110000,
                    weight: 520,
                    stock: 18
                },
                {
                    size: 'L',
                    price: 115000,
                    weight: 600,
                    stock: 12
                },
            ]
        };

        // Cập nhật state với sản phẩm mới
        setProductList([...productList, newProduct]);

    };

    // Hàm để thêm kích thước mới vào sản phẩm đầu tiên
    const addNewSize = () => {
        const newSize = {
            size: 'XXL',
            price: 130000,
            weight: 800,
            stock: 8
        };

        // Sao chép danh sách hiện tại
        const updatedProducts = [...productList];
        // Thêm kích thước vào sản phẩm đầu tiên
        updatedProducts[0].sizes.push(newSize);

        // Cập nhật state
        setProductList(updatedProducts);
    };




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
    const products = [
        {
            color: 'Xanh',
            sizes: [
                {
                    size: 'M',
                    price: 100000,   // Giá cho size M
                    weight: 500,     // Cân nặng cho size M (gram)
                    stock: 20        // Kho hàng cho size M
                },
                {
                    size: 'S',
                    price: 95000,    // Giá cho size S
                    weight: 450,     // Cân nặng cho size S (gram)
                    stock: 15        // Kho hàng cho size S
                },
                {
                    size: 'XL',
                    price: 120000,   // Giá cho size XL
                    weight: 700,     // Cân nặng cho size XL (gram)
                    stock: 10        // Kho hàng cho size XL
                }
            ]
        },
        {
            color: 'Xanh',
            sizes: [
                {
                    size: 'M',
                    price: 100000,   // Giá cho size M
                    weight: 500,     // Cân nặng cho size M (gram)
                    stock: 20        // Kho hàng cho size M
                },
                {
                    size: 'S',
                    price: 95000,    // Giá cho size S
                    weight: 450,     // Cân nặng cho size S (gram)
                    stock: 15        // Kho hàng cho size S
                },
                {
                    size: 'XL',
                    price: 120000,   // Giá cho size XL
                    weight: 700,     // Cân nặng cho size XL (gram)
                    stock: 10        // Kho hàng cho size XL
                }
            ]
        },
        {
            color: 'Xanh',
            sizes: [
                {
                    size: 'M',
                    price: 100000,   // Giá cho size M
                    weight: 500,     // Cân nặng cho size M (gram)
                    stock: 20        // Kho hàng cho size M
                },
                {
                    size: 'S',
                    price: 95000,    // Giá cho size S
                    weight: 450,     // Cân nặng cho size S (gram)
                    stock: 15        // Kho hàng cho size S
                },
                {
                    size: 'XL',
                    price: 120000,   // Giá cho size XL
                    weight: 700,     // Cân nặng cho size XL (gram)
                    stock: 10        // Kho hàng cho size XL
                }
            ]
        },
    ]
    const [productList, setProductList] = useState(products);
    // useEffect(()=>{

    // },[productList])
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
                                        previewUrls={previewUrls}
                                        handleFileChange={handleFileChange}
                                        handleCloseAtribute={handleCloseAtribute}
                                    />
                                    <div className={`${showAttributeSaleInfo1 === false ? 'p-3' : ''} w-100 bg-light mt-3 border-radius-small `}>
                                        {showAttributeSaleInfo1 === false &&
                                            <button className="btn-classify w-25"
                                                onClick={() => { setShowAttributeSaleInfo1(true) }}>
                                                <FontAwesomeIcon icon={faPlus} /> Thêm phân loại 2</button>}
                                        {showAttributeSaleInfo1 &&
                                            <>
                                                <AttributeSaleInfo
                                                    previewUrls={previewUrls}
                                                    handleFileChange={handleFileChange}
                                                    handleCloseAtribute={handleCloseAtribute1}
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
                                    <Col md={3} className="d-flex">
                                        <div className="select-search-sale-info" >
                                            <div className=" p-1 pe-2" style={{ borderRight: '2px solid rgb(241, 236, 236)' }}>
                                                <span >₫</span>
                                            </div>
                                            <input
                                                className="select-sale-info"
                                                placeholder="Giá"
                                                type="text"
                                            />
                                        </div>
                                    </Col>
                                    <Col md={3} className="d-flex">
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
                                    <Col md={3} className="d-flex">
                                        <div className="select-search-sale-info" >
                                            <input
                                                className="select-sale-info"
                                                placeholder="Kho hàng"
                                                type="text"
                                            />
                                        </div>
                                    </Col>
                                    <Col md={3} className="d-flex">
                                        <button className="btn-save-all-category">Áp dụng tất cả phân loại</button>
                                    </Col>
                                </Row>
                            }
                            <Row className="mt-3 custom-row p-3 ">
                                <div >
                                    {productList.map((product, index) => (
                                        <div key={index} className="d-flex">
                                            <Col md={3} className="bd-tb">
                                                {index === 0 &&
                                                    <div className="w-100  title-table bg-light p-2">
                                                        <span>Phân loại 1</span>
                                                    </div>}
                                                <div className="w-100   ttt  p-2">
                                                    <span>{product.color}</span>
                                                </div>
                                            </Col>
                                            <Col md={3} className="bd-tb">
                                                {index === 0 &&
                                                    <div className="w-100   title-table bg-light p-2">
                                                        <span>Phân loại 2</span>
                                                    </div>}
                                                {product.sizes.map((size) => (
                                                    <div key={size.size} className="w-100 ttt bg-white p-2">
                                                        <span>{size.size}</span>
                                                    </div>

                                                ))}
                                            </Col>
                                            <Col md={3} className="bd-tb">
                                                {index === 0 &&
                                                    <div className="w-100    title-table bg-light p-2">
                                                        <span>Giá</span>
                                                    </div>}
                                                {product.sizes.map((size) => (
                                                    <div key={size.size} className="w-100   bg-white ttt p-3">
                                                        <div className="select-search-sale-info" >
                                                            <div className=" p-1 pe-2" style={{ borderRight: '2px solid rgb(241, 236, 236)' }}>
                                                                <span >₫</span>
                                                            </div>
                                                            <input
                                                                className="select-sale-info"
                                                                style={{ padding: 0, paddingLeft: 10 }}
                                                                placeholder="Giá"
                                                                type="text"
                                                                value={size.price}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </Col>
                                            <Col md={3} className="bd-tb">
                                                {index === 0 &&
                                                    <div className="w-100   title-table bg-light p-2">
                                                        <span>Kho hàng</span>
                                                    </div>}
                                                {product.sizes.map((size) => (
                                                    <div key={size.size} className="w-100   ttt bg-white p-2">
                                                        <div className="select-search-sale-info" >
                                                            <input
                                                                className="select-sale-info"
                                                                style={{ padding: 5, paddingLeft: 10 }}
                                                                placeholder="Kho hàng"
                                                                type="text"
                                                                value={size.stock}
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
                        </Col>
                    </Row>
                </Col>
            </Row>

        </div>
    </div>);
}

export default SaleInfo;