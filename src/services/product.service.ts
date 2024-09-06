import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./base-query";
import { BaseResponse } from "../dtos/response/base-response";
import { PageResponse } from "../dtos/response/page-response";
import { Product } from "../models/product";


const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (build) => ({
        getProducts: build.query<BaseResponse<PageResponse<Product>>, void>({
            query: () => ({
                url: '/products',
                method: 'get',
            }),
            keepUnusedDataFor: 180,
        }),
        createProduct: build.mutation({
            query: (newProduct) => ({
                url: '/products',
                method: 'post',
                data: newProduct,
            }),
        }),
    }),
});

export const { useGetProductsQuery, useCreateProductMutation } = productApi;

export default productApi;