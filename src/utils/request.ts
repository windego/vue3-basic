
import axios, { AxiosResponse } from 'axios'
import { Loading, Message, MessageBox } from 'element-plus'
import { USER_NOT_LOGIN } from '@/constants/base'

import { falsyFilter } from './utils'

const transAxiosResponse = <ResponseData extends object | boolean>({
  data: axiosData,
}: AxiosResponse<IResponseData<ResponseData>>): Promise<ResponseData> => {
  if (axiosData.errno === 0) {
    return Promise.resolve(axiosData.data)
  }
  // message.error(axiosData.errmsg)

  // 未登录
  if (axiosData.errno === USER_NOT_LOGIN) {
    // window.location.replace((axiosData.data as any).url)
  }

  return Promise.reject(new Error(axiosData.errmsg))
}

const instance = axios.create({
  baseURL: 'https://api.windego.cn/', // url = base url + request url
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
})
instance.interceptors.request.use(conf => {
  let { params, method } = conf
  if (method === 'get' && params) {
    // 过滤所有空字符串参数
    params = falsyFilter(params)
  }
  return {
    ...conf,
    params,
  }
}, (error) => {
  // do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
})

instance.interceptors.response.use(
  response => {
    if (response.status >= 200 && response.status < 300) {
      return response
    }
    // message.error(response.statusText)
    return Promise.reject(new Error(response.statusText))
  },
  (error: Error) => {
    // message.error(error.message)
    return Promise.reject(error)
  },
)

export const get = <ResponseData extends object, Request = object>(
  url: string,
  params?: Request,
): Promise<ResponseData> =>
    instance
      .get<IResponseData<ResponseData>>(url, { params })
      .then(transAxiosResponse)

export const post = <ResponseData extends object | boolean, Request = object>(
  url: string,
  params?: Request,
): Promise<ResponseData> =>
    instance
      .post<IResponseData<ResponseData>>(url, params)
      .then(transAxiosResponse)

export const put = <ResponseData extends object | boolean, Request = object>(
  url: string,
  params?: Request,
): Promise<ResponseData> =>
    instance
      .put<IResponseData<ResponseData>>(url, params)
      .then(transAxiosResponse)
