import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./base-query";
import { BaseResponse } from "../dtos/response/base-response";
import { HistorySearch } from "../models/history-search";

const historySearchApi = createApi({
    reducerPath: 'historySearchApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (build) => ({
        getHistorySearch: build.query<BaseResponse<HistorySearch[]>, { userId?: string; content?: string }>({
            query: ({ userId, content }) => ({
                url: `/history-search${userId ? content ? "?userId=" + userId + "&content=" + content : "?userId=" + userId : content ? "?content=" + content : ""}`,
            }),
            keepUnusedDataFor:0
        }),
        deleteHistorySearch: build.mutation<BaseResponse<null>, string>({
            query: (id) => ({
                url: `/history-search/`+id,
                method:'delete'
            })
        }),
    })

})

export const { 
    useGetHistorySearchQuery,
    useDeleteHistorySearchMutation
} = historySearchApi;

export default historySearchApi;