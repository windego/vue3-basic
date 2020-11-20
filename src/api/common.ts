import { get, post, put } from '@/utils/request'

// export const fetchBingImgApi = (): Record<string, any> => get('/utils/bing/url')

// export interface MarketItem {
//   market_code: string;
//   market_name: string;
//   city_list: CityItem[];
// }
/**
 * 获取bing每日壁纸
 */
export const fetchBingImgApi = () =>
  get<Record<string, string>>('/utils/bing/url')
