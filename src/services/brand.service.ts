import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./base-query";
import { BaseResponse } from "../dtos/response/base-response";
import { Brand } from "../models/brand";
import { PageResponse } from "../dtos/response/page-response";
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
        getBrands: build.query<BaseResponse<PageResponse<Brand>>, string>({
            query: (params) => ({
                url: '/brands?'+params,
                method: 'get',
            }),
        }),
        updateBrands: build.mutation<BaseResponse<PageResponse<Brand>>, {id:string, formData:FormData}>({
            query: (brandUpdate) => ({
                url: '/brands/'+brandUpdate.id,
                method: 'put',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data: brandUpdate.formData,
            }),
        }),

    })
})

export const {
    useCreateBrandMutation,
    useGetBrandsQuery,
    useUpdateBrandsMutation
} = brandAPi;

export default brandAPi;