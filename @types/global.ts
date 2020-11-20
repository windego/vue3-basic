/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/no-namespace */
/**
 * ! 约定全局类型定义名字以I开头
 *
 */

/**
 *
 */
type Maybe<T> = T | null;

// 后端返回数据；
declare interface IResponseData<T> {
  errno: number;
  errmsg: string;
  data: T;
  st: number;
  logid: string;
}

// 列表类数据
declare interface IListResponse<T> {
  list: T[];
  total: number;
}

declare interface IAuth {
  id: string;
  code: string;
  name: string;
  type: number;
}
declare interface IPrivilege {
  id: number;
  name: string;
}

declare interface IUserInfo {
  user_id: string;
  user_name: string;
  chinesename: string;
  role_id: number;
  role_name: string; // 角色名称-超管
  status: 1 | 0; // 账号状态-生效or失效
  create_time?: number; // 时间戳，单位秒
  update_time?: number; // 时间戳，单位秒
  is_super: 1 | 0; // 是否是超管 1-是 0-否
  auth_list: IAuth[]; // 市场信息
  privilege_list: IPrivilege[]; // 权限信息
  report_privilege: 1 | 2 | 3 | 4; // 用户报表权限 code
}

declare interface IStoreState {
  userInfo: IUserInfo;
}

declare interface IPagerParams {
  page: number;
  page_size: number;
}

//
declare interface Options {
  key: string;
  value?: string | number;

  disabled?: boolean;
}

// context
declare interface KFCContext {
  userInfo: IUserInfo;
  marketOptions: MarketItem[];
}

declare interface DMItem {
  key: string;
  value: string;
  content: string;
  dm_user_id: string;
  dm_name: string;
}
declare interface CityItem {
  key: string;
  value: string;
  content: string;
  city_code: string;
  city_name: string;
  dm_list?: DMItem[];
}
declare interface MarketItem {
  key: string;
  value: string;
  content: string;
  market_code: string;
  market_name: string;
  city_list: CityItem[];
}

declare interface StringObject {
  [propName: string]: string;
}
