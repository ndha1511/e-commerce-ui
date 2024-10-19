import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./base-query";
import { BaseResponse } from "../dtos/response/base-response";
import { PageResponse } from "../dtos/response/page-response";
import { Order } from "../models/order";

const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (build) => ({
        getOrders: build.query<BaseResponse<PageResponse<Order>>, string>({
            query: (params) => ({
                url: '/categories?' + params,
                method: 'get',
            }),
            keepUnusedDataFor: 180,
        }),
        getOrdersByUserId: build.query<BaseResponse<PageResponse<Order>>, {userId: string, param: string}>({
            query: ({ userId, param }) => ({
                url: `/orders/${userId}?${param}`,
                method: 'get',
            }),
            keepUnusedDataFor: 180,
        })
    }),
});

export const {
    useGetOrdersQuery,
    useGetOrdersByUserIdQuery,
} = orderApi;
export default orderApi;