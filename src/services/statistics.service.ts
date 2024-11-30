import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./base-query";
import { BaseResponse } from "../dtos/response/base-response";
import { RevenueMonth } from "../dtos/response/statistics/revenue-month";
import { RevenueDay } from "../dtos/response/statistics/revenue-day";
import { Revenue } from "../dtos/response/statistics/revenue";
import { UserAmount } from "../dtos/response/user/user-amount";
import { ProductSelling } from "../dtos/response/product/product-selling";

const statisticsApi = createApi({
    reducerPath: 'statisticsApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (build) => ({

        getRevenueInYear: build.query<BaseResponse<RevenueMonth[]>, number>({
            query: (year) => ({
                url: `/statistics/revenue-in-year?year=${year}`,
                method: 'get',
            }),
            keepUnusedDataFor: 180,
        }),

        getTotalOrders: build.query<BaseResponse<number>, {startDate: string; endDate: string}>({
            query: ({startDate, endDate}) => ({
                url: `/statistics/total-order?startDate=${startDate}&endDate=${endDate}`,
                method: 'get',
            }),
            keepUnusedDataFor: 180,
        }),

        getRevenueDay: build.query<BaseResponse<RevenueDay[]>, {startDate: string; endDate: string}>({
            query: ({startDate, endDate}) => ({
                url: `/statistics/revenue-day?startDate=${startDate}&endDate=${endDate}`,
                method: 'get',
            }),
            keepUnusedDataFor: 180,
        }),

        getTotalRevenue: build.query<BaseResponse<Revenue>, {startDate: string; endDate: string}>({
            query: ({startDate, endDate}) => ({
                url: `/statistics/total-revenue?startDate=${startDate}&endDate=${endDate}`,
                method: 'get',
            }),
            keepUnusedDataFor: 180,
        }),

        getTopUser: build.query<BaseResponse<UserAmount[]>, {startDate: string; endDate: string}>({
            query: ({startDate, endDate}) => ({
                url: `/statistics/top-user?startDate=${startDate}&endDate=${endDate}`,
                method: 'get',
            }),
            keepUnusedDataFor: 180

        }),

        getTopProduct: build.query<BaseResponse<ProductSelling[]>, {startDate: string; endDate: string}>({
            query: ({startDate, endDate}) => ({
                url: `/statistics/top-product?startDate=${startDate}&endDate=${endDate}`,
                method: 'get',
            }),
            keepUnusedDataFor: 180
        })
       

    })
})

export const {
    useGetRevenueInYearQuery,
    useGetTotalOrdersQuery,
    useGetRevenueDayQuery,
    useGetTotalRevenueQuery,
    useGetTopUserQuery,
    useGetTopProductQuery
} = statisticsApi;

export default statisticsApi;