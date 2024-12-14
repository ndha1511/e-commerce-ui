import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./base-query";
import { BaseResponse } from "../dtos/response/base-response";
import { PurchaseOrder } from "../models/purchase-order";
import { PageResponse } from "../dtos/response/page-response";
import { PurchaseDetail } from "../dtos/response/purchase/purchase-detail";

const purchaseApi = createApi({
    reducerPath: 'purchaseApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (build) => ({
        getPurchaseOrder: build.query<BaseResponse<PageResponse<PurchaseOrder>>, string >({
            query: (param) => ({
                url: `/purchase-orders?${param}`,
            })
        }),
        getPurchaseOrderId: build.query<BaseResponse<PurchaseDetail>, string >({
            query: (id) => ({
                url: `/purchase-orders/${id}`,
            })
        }),
     
    })

})

export const { 
    useGetPurchaseOrderQuery,
    useGetPurchaseOrderIdQuery,
} = purchaseApi;

export default purchaseApi;