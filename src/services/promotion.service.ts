import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./base-query";
import { BaseResponse } from "../dtos/response/base-response";
import { Promotion } from "../models/promotion";

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
    })

})

export const { 
    useGetPromotionCarouselQuery,
    useCreatePromotionMutation
} = promotionApi;

export default promotionApi;