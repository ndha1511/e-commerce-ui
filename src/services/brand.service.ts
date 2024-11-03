import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./base-query";
import { BaseResponse } from "../dtos/response/base-response";
import { Brand } from "../models/brand";
const brandAPi = createApi({
    reducerPath: 'brand',
    baseQuery: axiosBaseQuery(),
    endpoints: (build) => ({
        createBrand: build.mutation<BaseResponse<Brand>, FormData>({
            query: (newBrand) => ({
                url: '/brands',
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data: newBrand,
            }),
        }),

    })
})

export const {
    useCreateBrandMutation
} = brandAPi;

export default brandAPi;