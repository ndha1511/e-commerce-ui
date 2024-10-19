import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./base-query";
import { BaseResponse } from "../dtos/response/base-response";
import { UserAddress } from "../models/user-address";
import { UserAddressDto } from "../dtos/request/address/user-address-dto";
import { Province } from "../dtos/response/address/province";
import { District } from "../dtos/response/address/district";
import { Ward } from "../dtos/response/address/ward";
import { AddressDto } from "../dtos/request/address/address-dto";
import { Address } from "../models/address";


const addressApi = createApi({
    reducerPath: 'addressApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (build) => ({
        getAddressByUserId: build.query<BaseResponse<UserAddress[]>, string>({
            query: (userId) => ({
                url: `/addresses/${userId}`,
                method: 'get',
            }),
            keepUnusedDataFor: 180,
        }),
        addUserAddress: build.mutation<BaseResponse<UserAddress>, UserAddressDto>({
            query: (address) => ({
                url: '/addresses/add-user-address',
                method: 'post',
                data: address
            })
        }),
        getProvinces: build.query<BaseResponse<Province[]>, void>({
            query: () => ({
                url: '/addresses/provinces',
                method: 'get',
            }),
            keepUnusedDataFor: 180,
        }),
        getDistricts: build.query<BaseResponse<District[]>, number>({
            query: (provinceId) => ({
                url: `/addresses/districts?province_id=${provinceId}`,
                method: 'get',
            }),
            keepUnusedDataFor: 180,
        }),
        getWards: build.query<BaseResponse<Ward[]>, number>({
            query: (districtId) => ({
                url: `/addresses/wards?district_id=${districtId}`,
                method: 'get',
            }),
            keepUnusedDataFor: 180,
        }),
        addAddress: build.mutation<BaseResponse<Address>, AddressDto>({
            query: (address) => ({
                url: `/addresses`,
                method: 'post',
                data: address
            })
        }),
        getAddress: build.query<BaseResponse<Address>, void>({
            query: () => ({
                url: '/addresses',
                method: 'get',
            }),
            keepUnusedDataFor: 180,
        })

    })
})

export const {
    useGetAddressByUserIdQuery,
    useAddUserAddressMutation,
    useGetProvincesQuery,
    useGetDistrictsQuery,
    useGetWardsQuery,
    useAddAddressMutation,
    useGetAddressQuery
} = addressApi;

export default addressApi;