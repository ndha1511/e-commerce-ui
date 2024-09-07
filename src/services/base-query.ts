import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import { ErrorResponse } from '../dtos/response/error-response'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})


axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log('Unauthorized, redirecting to login...')
    }
    return Promise.reject(error)
  }
)

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method?: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
      headers?: AxiosRequestConfig['headers']
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      const errorResponse: ErrorResponse = {
        status: err.response?.status,
        data: err.response?.data || err.message,
      }
      return {
        error: errorResponse,
      }
    }
  }

