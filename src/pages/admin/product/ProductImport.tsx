import { Col, Form, Pagination, Row, Table } from "react-bootstrap";
import { convertPrice } from "../../../utils/convert-price";

function ProductImport() {
    const productDetailsData = [
        {
            sku: "SP001",
            productName: "Áo Thun Nam",
            quantity: 50,
            importPrice: 100000, // Giá nhập (VNĐ)
            total: 5000000, // Tổng tiền = Số lượng * Giá nhập
            img: "https://via.placeholder.com/150", // Đường dẫn đến ảnh đại diện
        },
        {
            sku: "SP002",
            productName: "Quần Jean Nữ",
            quantity: 30,
            importPrice: 200000,
            total: 6000000,
            img: "https://via.placeholder.com/150",
        },
        {
            sku: "SP003",
            productName: "Giày Thể Thao",
            quantity: 20,
            importPrice: 300000,
            total: 6000000,
            img: "https://via.placeholder.com/150",
        },
        {
            sku: "SP004",
            productName: "Túi Xách Da",
            quantity: 10,
            importPrice: 500000,
            total: 5000000,
            img: "https://via.placeholder.com/150",
        },
        {
            sku: "SP005",
            productName: "Mũ Lưỡi Trai",
            quantity: 40,
            importPrice: 50000,
            total: 2000000,
            img: "https://via.placeholder.com/150",
        },
    ];


    return (
        <div className="p-3 bg-light">
            <div className=" d-flex justify-content-between">
                <h5>Thông tin sản phẩm</h5>
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
            <Table className='table-bordered table-responsive  custom-table-product-stock-import '>
                <thead>
                    <tr>
                        <th>SKU</th>
                        <th>ẢNH ĐẠI DIỆN</th>
                        <th>TÊN SẢN PHẨM</th>
                        <th>SỐ LƯỢNG</th>
                        <th>GIÁ NHẬP</th>
                        <th>TỔNG</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {productDetailsData?.map((product, index) => (
                        <tr key={index}>
                            <td>{product.sku}</td>
                            <td className="pt-1 pb-1"><img src={product.img} alt='anh' width={60} height={60} /></td>
                            <td >{product.productName.length > 70 ? product.productName.slice(0, 70) + '...' : product.productName}</td>
                            <td className="p-3">
                                <div className=" p-1 border border-radius-small">
                                    <input
                                        style={{ outline: 'none', border: 'none' }}
                                        type="text"
                                        value={product.quantity}
                                    />
                                </div>
                            </td>
                            <td className="p-3">
                                <div className=" p-1 border border-radius-small">
                                    <input
                                        style={{ outline: 'none', border: 'none' }}
                                        type="text"
                                        value={product.importPrice}
                                    />
                                </div>
                            </td>
                            <td>{product.total}</td>
                            <td><i className="bi bi-trash3"></i></td>
                        </tr>
                    ))}

                </tbody>
            </Table>
            <div className="  d-flex justify-content-end pe-4">
                <Row className=" w-25" >
                    <Col md={6}>
                        <div className="d-flex flex-column">
                            <p>Số lượng</p>
                            <p>Tạm tính</p>
                            <p>Tax</p>
                            <p>Giảm giá</p>
                            <p>Chi phí</p>
                            <h5>Tổng cộng</h5>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="d-flex flex-column text-end">
                            <p>400 sản phẩm</p>
                            <p>{convertPrice(30000000)}</p>
                            <p>{convertPrice(3000000)}</p>
                            <p>{convertPrice(3000000)}</p>
                            <p>{convertPrice(300000)}</p>
                            <p>{convertPrice(30000000)}</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default ProductImport;