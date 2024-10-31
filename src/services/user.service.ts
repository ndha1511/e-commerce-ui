import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./base-query";
import { BaseResponse } from "../dtos/response/base-response";
const userApi = createApi({
    reducerPath: 'user',
    baseQuery: axiosBaseQuery(),
    endpoints: (build) => ({
        updateUser: build.mutation<BaseResponse<null>, {email:string, newUser:FormData}>({
            query: ({ email,newUser }) => ({
                url: '/users/' + email,
                method: 'put',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data: newUser,
            }),
        }),

    })
})

export const {
    useUpdateUserMutation
} = userApi;

export default userApi;