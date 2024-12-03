import React, { useEffect } from "react";
import { SatisticsProps } from "../types";
import { useGetRevenueDayQuery, useGetRevenueInYearQuery, useGetTopProductQuery, useGetTopUserQuery, useGetTotalOrdersQuery, useGetTotalRevenueQuery } from "../../../../services/statistics.service";
import { formatDate, formatDate2, getDateStringToday, getDateToday, getStartAndEndOfMonth, getStartAndEndOfWeek, getStartAndEndOfYear } from "../../../../utils/datetime";
import WeeklyContent from "./WeeklyContent";
import MonthlyContent from "./MonthlyContent";
import DailyContent from "./DailyContent";
import YearContent from "./YearContent";

const StatisticsContent: React.FC<SatisticsProps> = (props) => {
    const { search, setSearch, mode } = props;
    const today = getDateToday();
    const { startDate, endDate } = getDateStringToday();

    const queryResultRevenueMonth = useGetRevenueInYearQuery(search.year || today.getFullYear());

    const queryResultTotalOrderToday = useGetTotalOrdersQuery({
        startDate: search.startDate || startDate,
        endDate: search.endDate || endDate
    });

    const queryResultRevenueToday = useGetTotalRevenueQuery({
        startDate: search.startDate || startDate,
        endDate: search.endDate || endDate
    });


    const queryResultRevenueDay = useGetRevenueDayQuery({
        startDate: search.startDate || startDate,
        endDate: search.endDate || endDate
    })


    const queryResultTopUser = useGetTopUserQuery({
        startDate: search.startDate || startDate,
        endDate: search.endDate || endDate
    });

    const queryResultTopProduct = useGetTopProductQuery({
        startDate: search.startDate || startDate,
        endDate: search.endDate || endDate
    });

    const { startOfWeekString, endOfWeekString } = getStartAndEndOfWeek();

    const { startOfMonthString, endOfMonthString } = getStartAndEndOfMonth(search.monthYear || formatDate2(formatDate(new Date()), "yyyy-MM"));

    const {startOfYearString, endOfYearString} = getStartAndEndOfYear(search.year || new Date().getFullYear());

    useEffect(() => {
        switch (mode) {
            case "daily":
                setSearch({ ...search, startDate: startDate, endDate: endDate });
                break;
            case "monthly":
                setSearch({ ...search, startDate: startOfMonthString, endDate: endOfMonthString });
                break;
            case "weekly":
                setSearch({ ...search, startDate: startOfWeekString, endDate: endOfWeekString });
                break;
            default:
                setSearch({ ...search, startDate: startOfYearString, endDate: endOfYearString });
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode]);

    const renderByMode = () => {
        switch (mode) {
            case "weekly":
                return <WeeklyContent
                    productsSelling={queryResultTopProduct.data?.data}
                    usersAmount={queryResultTopUser.data?.data}
                    revenueDays={queryResultRevenueDay.data?.data}
                    startDate={search.startDate}
                    endDate={search.endDate}
                    totalOrder={queryResultTotalOrderToday.data?.data}
                    revenue={queryResultRevenueToday.data?.data}
                />
            case "monthly":
                return <MonthlyContent
                    productsSelling={queryResultTopProduct.data?.data}
                    usersAmount={queryResultTopUser.data?.data}
                    revenueDays={queryResultRevenueDay.data?.data}
                    monthYear={search.monthYear}
                    totalOrder={queryResultTotalOrderToday.data?.data}
                    revenue={queryResultRevenueToday.data?.data}
                />
            case "year":
                return <YearContent
                productsSelling={queryResultTopProduct.data?.data}
                usersAmount={queryResultTopUser.data?.data}
                revenueMonths={queryResultRevenueMonth.data?.data}
                year={search.year}
                totalOrder={queryResultTotalOrderToday.data?.data}
                revenue={queryResultRevenueToday.data?.data}
            />    
            default:
                return <DailyContent
                    productsSelling={queryResultTopProduct.data?.data}
                    usersAmount={queryResultTopUser.data?.data}
                    revenueDays={queryResultRevenueDay.data?.data}
                    startDate={search.startDate}
                    endDate={search.endDate}
                    totalOrder={queryResultTotalOrderToday.data?.data}
                    revenue={queryResultRevenueToday.data?.data}
                />
        }

    }
    return (
        <div>
            {renderByMode()}
        </div>
    );
};

export default StatisticsContent;