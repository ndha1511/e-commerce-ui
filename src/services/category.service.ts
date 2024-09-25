import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./base-query";
import { BaseResponse } from "../dtos/response/base-response";
import { PageResponse } from "../dtos/response/page-response";
import { Category } from "../models/category";

const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (build) => ({
        getCategories: build.query<BaseResponse<PageResponse<Category>>, void>({
            query: () => ({
                url: '/categories',
                method: 'get',
            }),
            keepUnusedDataFor: 180,
        }),
    }),
});

export const { useGetCategoriesQuery,} = categoryApi;

export default categoryApi;