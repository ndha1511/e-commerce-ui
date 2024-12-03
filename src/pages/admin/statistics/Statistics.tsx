import { useState } from "react";
import StatisticsContent from "./content/StatisticsContent";
import StatisticsToolbar from "./toolbar/StatisticsToolbar";
import { Mode, SatisticsSearch } from "./types";
import { formatDate, formatDate2, getDateStringToday } from "../../../utils/datetime";

const Statistics: React.FC = () => {
    const {startDate, endDate} = getDateStringToday();
    const [search, setSearch] = useState<SatisticsSearch>({
        startDate: startDate,
        endDate: endDate,
        monthYear: formatDate2(formatDate(new Date()), "yyyy-MM"),
        year: new Date().getFullYear()
    });
    const [mode, setMode] = useState<Mode["mode"]>("daily");

    return <div className="d-flex flex-column p-3 bg-light">
        <div className="bg-white p-3 border-radius-small mb-3 mt-3">
            <h6>Thống kê</h6>
            <div className="p-3">
               <StatisticsToolbar search={search} setSearch={setSearch} mode={mode} setMode={setMode}/>
               <StatisticsContent search={search} setSearch={setSearch} mode={mode} setMode={setMode}/>
            </div>
        </div>
    </div>
};

export default Statistics;