import { Col, Row } from "react-bootstrap";
import BarChart from "../../../../components/chart/BarChart";
import { ContentProps } from "../types";
import InfoOrder from "./InfoOrder";
import ProductBestSelling from "./ProductBestSelling";
import TopUser from "./TopUser";
import { isMobile } from "../../../../utils/responsive";

const YearContent: React.FC<ContentProps> = (props) => {
  const {
    revenueMonths,
    productsSelling,
    usersAmount,
    year,
    revenue,
    totalOrder,
  } = props;
  const mobile = isMobile();

  return (
    <div className={`${mobile ? "p-0 mt-3" : "p-3"}`}>
      <InfoOrder revenue={revenue} totalOrder={totalOrder} />
      <Row className="mt-4">
        <Col xs={12} md={7}>
          <div className="shadow-all p-3">
            <BarChart
              data={revenueMonths?.map((data) => data.profit.toString()) || []}
              labels={revenueMonths?.map((data) => data.month.toString()) || []}
              title={`Biểu đồ thống kê doanh thu năm ${year}`}
              labelX="Tháng"
              labelY="Doanh thu"
            />
          </div>
        </Col>
        <Col xs={12} md={5}>
          <div className="shadow-all p-3">
            <TopUser users={usersAmount || []} />
          </div>
        </Col>
      </Row>
      <div className="shadow-all p-3 mt-3">
        <ProductBestSelling products={productsSelling || []} />
      </div>
    </div>
  );
};

export default YearContent;
