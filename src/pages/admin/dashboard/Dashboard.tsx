import { Col, Row } from "react-bootstrap";
import BarChart from "../../../components/chart/BarChart";
import { useCheckLoginQuery } from "../../../services/auth.service";
import { getDateStringToday, getDateToday } from "../../../utils/datetime";
import { useGetRevenueInYearQuery, useGetTopProductQuery, useGetTopUserQuery, useGetTotalOrdersQuery, useGetTotalRevenueQuery } from "../../../services/statistics.service";
import { convertPrice } from "../../../utils/convert-price";


const Dashboard = () => {

    const queryUserMe = useCheckLoginQuery();

    const {startDate, endDate} = getDateStringToday();

    const today = getDateToday();

    const queryResultTotalOrderToday = useGetTotalOrdersQuery({
        startDate: startDate,
        endDate: endDate
    });

    const queryResultRevenueToday = useGetTotalRevenueQuery({
        startDate: startDate,
        endDate: endDate
    });

    const queryResultRevenueMonth = useGetRevenueInYearQuery(today.getFullYear());

    const queryResultTopUser = useGetTopUserQuery({
        startDate: startDate,
        endDate: endDate
    });

    const queryResultTopProduct = useGetTopProductQuery({
        startDate: startDate,
        endDate: endDate
    })

    return <div className="d-flex flex-column bg-light p-3 gap-3">
        <div className="d-flex align-items-center justify-content-between loading-container">
            <h5>Dashboard</h5>
        </div>
        <div className="pt-3 pb-3" style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.1)"
        }}>
            <Row className="ps-3">
                <Col md={2}>Xin chào: {queryUserMe.data?.data?.name} </Col>
            </Row>
            <Row className="ps-3 pt-3">
                <Col md={2}>Đơn hàng hôm nay:</Col>
                <Col>{queryResultTotalOrderToday.data?.data || 0}</Col>
            </Row>
            <Row className="ps-3 pt-3">
                <Col md={2}>Doanh thu:</Col>
                <Col>{convertPrice(queryResultRevenueToday.data?.data.revenue)}</Col>
            </Row>
            <Row className="ps-3 pt-3">
                <Col md={2}>Lợi nhuận:</Col>
                <Col>{convertPrice(queryResultRevenueToday.data?.data.profit)}</Col>
            </Row>
        </div>
        <Row>
            <Col>
            <BarChart
                data={queryResultRevenueMonth.data?.data?.map(data => data.profit.toString()) || []}
                labels={queryResultRevenueMonth.data?.data?.map(data => data.month.toString()) || []}
                title={`Biểu đồ thống kê doanh thu năm ${today.getFullYear()}`}
                labelX="Tháng"
                labelY="Doanh thu"
            />
            </Col>
            <Col>
                <span>Khách hàng hôm nay</span>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Ảnh đại diện</th>
                            <th>Tên khách hàng</th>
                            <th>Doanh thu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queryResultTopUser.data?.data?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.user.avatar}</td>
                                <td>{item.user.email}</td>
                                <td>{convertPrice(item.amount)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Col>
            
        </Row>

        <Row>
            <span>Sản phẩm bán chạy nhất ngày</span>
            <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng bán</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queryResultTopProduct.data?.data?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><img src={item.product.thumbnail} width={50} height={50}/></td>
                                <td>{item.product.productName}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </Row>
        
    </div>
}

export default Dashboard;