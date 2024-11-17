import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./base-query";
import { BaseResponse } from "../dtos/response/base-response";
import { PageResponse } from "../dtos/response/page-response";
import { Message } from "../models/message";
import { Room } from "../models/room";
const roomApi = createApi({
    reducerPath: 'room',
    baseQuery: axiosBaseQuery(),
    endpoints: (build) => ({
        getRoom: build.query<BaseResponse<PageResponse<Room>>, {email : string ; param :string}>({
            query: (params) => ({
                url: `/rooms/${params.email}?` + params.param,
                method: 'get',
            }),
            keepUnusedDataFor: 180,
        }),

    })
})

export const {
    useGetRoomQuery
} = roomApi;

export default roomApi;