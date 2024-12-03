import BarChart from "../../../../components/chart/BarChart";
import { ContentProps } from "../types";
import InfoOrder from "./InfoOrder";
import ProductBestSelling from "./ProductBestSelling";
import TopUser from "./TopUser";

const YearContent: React.FC<ContentProps> = (props) => {
    const {revenueMonths, productsSelling, usersAmount, year, revenue, totalOrder} = props;
    return <div>
        <InfoOrder revenue={revenue} totalOrder={totalOrder}/>
        <BarChart
                data={revenueMonths?.map(data => data.profit.toString()) || []}
                labels={revenueMonths?.map(data => data.month.toString()) || []}
                title={`Biểu đồ thống kê doanh thu năm ${year}`}
                labelX="Tháng"
                labelY="Doanh thu"
            />
        <TopUser users={usersAmount || []}/>
        <ProductBestSelling products={productsSelling || []}/>
    </div>

}

export default YearContent;