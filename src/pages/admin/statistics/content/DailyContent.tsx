import BarChart from "../../../../components/chart/BarChart";
import { ContentProps } from "../types";
import InfoOrder from "./InfoOrder";
import ProductBestSelling from "./ProductBestSelling";
import TopUser from "./TopUser";

const DailyContent: React.FC<ContentProps> = (props) => {
    const {revenueDays, productsSelling, usersAmount, startDate, endDate, revenue, totalOrder} = props;
    return <div>
        <InfoOrder revenue={revenue} totalOrder={totalOrder}/>
        <BarChart
                data={revenueDays?.map(data => data.profit.toString()) || []}
                labels={revenueDays?.map(data => data.dayMonth.toString()) || []}
                title={`Biểu đồ thống kê doanh thu từ ${startDate} đến ${endDate}`}
                labelX="Ngày"
                labelY="Doanh thu"
            />
        <TopUser users={usersAmount || []}/>
        <ProductBestSelling products={productsSelling || []}/>
    </div>
}

export default DailyContent;