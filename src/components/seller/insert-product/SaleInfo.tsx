import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import './sale-info.scss';
import useChangeFile from "../../../hooks/useChangeFile";
import AttributeSaleInfo from "./AttibuteSaleInfo";
import { useState } from "react";
import TableProduct from "./TableProduct";
function SaleInfo() {

    const { previewUrls, handleFileChange } = useChangeFile(9, [], []);
    const [showAttributeSaleInfo, setShowAttributeSaleInfo] = useState(false);
    const [showAttributeSaleInfo1, setShowAttributeSaleInfo1] = useState(false);
    const [attribute, setAttribute] = useState<string>('');
    const [attributeList, setAttributeList] = useState<string[]>([]);
    console.log(attributeList)

    const handleAttributechange = (newAttribute: string) => {
        setAttribute(newAttribute);

        setAttributeList((prev) => {
            let newList = [...prev];
            // Đảm bảo rằng newList có ít nhất 2 vị trí
            if (newList.length < 2) {
                if (newList.length === 0) newList.push(''); // Thêm vị trí 0 nếu chưa có
                if (newList.length === 1) newList.push(''); // Thêm vị trí 1 nếu chưa có
            }

            if (showAttributeSaleInfo1) {
                // Chèn vào vị trí 1
                newList[1] = newAttribute;
            } else if (showAttributeSaleInfo) {
                // Chèn vào vị trí 0, giữ nguyên nếu chưa có gì thì để rỗng
                newList[0] = newAttribute || '';
            }

            return newList;
        });
    };

    // Hàm để thêm sản phẩm mới vào danh sách
    const addNewProduct = () => {
        console.log('ádfasdfsadf')
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


    const addAttribute = () => {

    }

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
                                        handleAttributechange={handleAttributechange}
                                        index={0}
                                        addNewProduct={addNewProduct}
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
                                                    handleAttributechange={handleAttributechange}
                                                    index={1}
                                                    addNewProduct={addNewProduct}
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
                            {showAttributeSaleInfo && <TableProduct productList={productList} addNewProduct={addNewProduct} attribute={attributeList} />}

                        </Col>
                    </Row>
                </Col>
            </Row>

        </div>
    </div>);
}

export default SaleInfo;