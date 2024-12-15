import { Col, Row, Table } from "react-bootstrap";
import BarChart from "../../../components/chart/BarChart";
import { useCheckLoginQuery } from "../../../services/auth.service";
import { getDateStringToday, getDateToday } from "../../../utils/datetime";
import {
  useGetRevenueInYearQuery,
  useGetTopProductQuery,
  useGetTopUserQuery,
  useGetTotalOrdersQuery,
  useGetTotalRevenueQuery,
} from "../../../services/statistics.service";
import { convertPrice } from "../../../utils/convert-price";
import "./dashboard.scss";
import SimpleBar from "simplebar-react";
import QueryWrapper from "../../../components/query-wrapper/QueryWrapper";
import SkeltetonWrapper from "../../../components/query-wrapper/SkeletonWrapper";

const Dashboard = () => {
  const queryUserMe = useCheckLoginQuery();

  const { startDate, endDate } = getDateStringToday();

  const today = getDateToday();

  const queryResultTotalOrderToday = useGetTotalOrdersQuery({
    startDate: startDate,
    endDate: endDate,
  });

  const queryResultRevenueToday = useGetTotalRevenueQuery({
    startDate: startDate,
    endDate: endDate,
  });

  const queryResultRevenueMonth = useGetRevenueInYearQuery(today.getFullYear());

  const queryResultTopUser = useGetTopUserQuery({
    startDate: startDate,
    endDate: endDate,
  });

  const queryResultTopProduct = useGetTopProductQuery({
    startDate: startDate,
    endDate: endDate,
  });

  return (
    <QueryWrapper
      queriesSuccess={[
        !queryResultRevenueMonth.isFetching,
        !queryResultTopProduct.isFetching,
        !queryResultTopUser.isFetching,
        !queryResultTotalOrderToday.isFetching,
        !queryResultRevenueToday.isFetching,
        !queryUserMe.isFetching,
      ]}
      queriesError={[
        queryResultRevenueMonth.isError,
        queryResultTopProduct.isError,
        queryResultTopUser.isError,
        queryResultTotalOrderToday.isError,
        queryResultRevenueToday.isError,
        queryUserMe.isError,
      ]}
    >
      <div className="bg-light p-3">
        <div className="d-flex flex-column bg-white p-3 gap-3 border-radius-small">
          <div className="d-flex align-items-center justify-content-between loading-container">
            <h5>Tổng quan</h5>
          </div>
          <SkeltetonWrapper
            queriesStatus={[
              queryResultRevenueToday.isSuccess,
              queryResultTotalOrderToday.isSuccess,
            ]}
            skHeight={200}
          >
            <div
              className="pt-3 pb-3"
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Row className="ps-3">
                <Col md={2}>Xin chào: {queryUserMe.data?.data?.name} </Col>
              </Row>
              <Row className="ps-3 pt-3">
                <Col md={2}>Đơn hàng hôm nay:</Col>
                <Col>{queryResultTotalOrderToday.data?.data || 0}</Col>
              </Row>
              <Row className="ps-3 pt-3">
                <Col md={2}>Doanh thu:</Col>
                <Col>
                  {convertPrice(queryResultRevenueToday.data?.data.revenue)}
                </Col>
              </Row>
              <Row className="ps-3 pt-3">
                <Col md={2}>Lợi nhuận:</Col>
                <Col>
                  {convertPrice(queryResultRevenueToday.data?.data.profit)}
                </Col>
              </Row>
            </div>
          </SkeltetonWrapper>
          <Row className="mt-3">
            <Col xs={12} md={7}>
              <SkeltetonWrapper queriesStatus={[queryResultRevenueMonth.isSuccess]} skHeight={400}>
              <div className="shadow-all ">
                <BarChart
                  data={
                    queryResultRevenueMonth.data?.data?.map((data) =>
                      data.profit.toString()
                    ) || []
                  }
                  labels={
                    queryResultRevenueMonth.data?.data?.map((data) =>
                      data.month.toString()
                    ) || []
                  }
                  title={`Biểu đồ thống kê doanh thu năm ${today.getFullYear()}`}
                  labelX="Tháng"
                  labelY="Doanh thu"
                />
              </div>
              </SkeltetonWrapper>
            </Col>
            <Col xs={12} md={5}>
              <div className="shadow-all p-3">
              <SkeltetonWrapper queriesStatus={[queryResultTopUser.isSuccess]} skHeight={400}>
                <h6>
                  Khách hàng hôm nay{" "}
                  <span style={{ fontSize: 12 }}>
                    ({queryResultTopUser.data?.data.length})
                  </span>
                </h6>
                <SimpleBar style={{ height: 300 }}>
                  <Table className="mb-0 mt-2 table-bordered table-responsive custom-table-dashboard">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Ảnh đại diện</th>
                        <th>Email khách hàng</th>
                        <th>Doanh thu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {queryResultTopUser.data?.data?.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <img
                              src={item.user.avatar}
                              width={50}
                              height={50}
                            />
                          </td>
                          <td>
                            <span
                              style={{
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {item.user.email}
                            </span>
                          </td>

                          <td>{convertPrice(item.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </SimpleBar>
                </SkeltetonWrapper>
              </div>
            </Col>
          </Row>

          <Row>
            <div className="shadow-all p-3">
            <SkeltetonWrapper queriesStatus={[queryResultTopProduct.isSuccess]} skHeight={400}>
              <h6>
                Những sản phẩm bán chạy trong ngày{" "}
                <span style={{ fontSize: 12 }}>
                  ({queryResultTopProduct.data?.data.length})
                </span>
              </h6>
              <SimpleBar style={{ height: 800 }}>
                <Table className="mb-0 mt-2 table-bordered table-responsive custom-table-dashboard">
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
                        <td>
                          <img
                            src={item.product.thumbnail}
                            width={70}
                            height={70}
                          />
                        </td>
                        <td>{item.product.productName}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </SimpleBar>
              </SkeltetonWrapper>
            </div>
          </Row>
        </div>
      </div>
    </QueryWrapper>
  );
};

export default Dashboard;
