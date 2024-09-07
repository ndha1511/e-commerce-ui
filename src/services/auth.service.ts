import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./base-query";
import { BaseResponse } from "../dtos/response/base-response";
import { RegisterRequest } from "../dtos/request/auth/register.request";
import { TokenResponse } from "../dtos/response/auth/token-response";

const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (build) => ({
        checkEmail: build.query<BaseResponse<null>, string>({
            query: (email: string) => ({
                url: `/auth/check-email?email=${email}`,
                method: 'get',
            })
        }),
        register: build.mutation<BaseResponse<null>, RegisterRequest>({
            query: (registerRequest)  => ({
                url: '/auth/register',
                method: 'post',
                data: registerRequest,
            })
        }),
        verifyEmail: build.query<BaseResponse<TokenResponse>, {email: string, otp: string}>({
            query: ({email, otp}) =>({
                url: `/auth/verify-email?email=${email}&otp=${otp}`,
                method: 'get',
            })
        }),
        sendOtp: build.query<BaseResponse<null>, string>({
            query: (email) => ({
                url: `/auth/send-otp?email=${email}`,
                method: 'get',
            })
        }),
        login: build.mutation<BaseResponse<TokenResponse>, {username: string, password: string}>({
            query: ({username, password}) => ({
                url: '/auth/login',
                method: 'post',
                data: { username, password },
            })
        })
    }),
})

export const {
    useLazyCheckEmailQuery, 
    useRegisterMutation, 
    useLazyVerifyEmailQuery,
    useLazySendOtpQuery,
    useLoginMutation
} = authApi;
export default authApi;