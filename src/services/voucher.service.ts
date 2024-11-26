import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./base-query";
import { BaseResponse } from "../dtos/response/base-response";
import { Voucher } from "../models/voucher";
import { PageResponse } from "../dtos/response/page-response";

const voucherApi = createApi({
    reducerPath: 'voucherApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (build) => ({
        getVouchersByUserId: build.query<BaseResponse<PageResponse<Voucher>>, {userId: string, param?: string}>({
            query: ({userId, param}) => ({
                url: `/vouchers/${userId}${param ? "?" + param : ""}`,
            })
        }),
        createVoucher: build.mutation<BaseResponse<PageResponse<Voucher>>, FormData>({
            query: (newVoucher) => ({
                url: `/vouchers`,
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data: newVoucher,
            })
        }),
    })

})

export const { 
    useGetVouchersByUserIdQuery,
    useCreateVoucherMutation
} = voucherApi;

export default voucherApi;