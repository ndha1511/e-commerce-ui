import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./base-query";
import { BaseResponse } from "../dtos/response/base-response";
import { Promotion } from "../models/promotion";
import { Product } from "../models/product";

const promotionApi = createApi({
    reducerPath: 'promotionApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (build) => ({
        getPromotionCarousel: build.query<BaseResponse<Promotion[]>, void>({
            query: () => ({
                url: `/promotions/carousel`,
            })
        }),
        createPromotion: build.mutation<BaseResponse<Promotion>, FormData>({
            query: (newPromotion) => ({
                url: `/promotions`,
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data: newPromotion,
            })
        }),
        getPromotion: build.query<BaseResponse<Promotion>, string>({
            query: (url) => ({
                url: `/promotions/`+ url,
            })
        }),
        getProductByPromotionId: build.query<BaseResponse<Product[]>, string>({
            query: (id) => ({
                url: `/promotions/products/`+ id,
            })
        }),
    })

})

export const { 
    useGetPromotionCarouselQuery,
    useCreatePromotionMutation,
    useGetPromotionQuery,
    useGetProductByPromotionIdQuery
} = promotionApi;

export default promotionApi;