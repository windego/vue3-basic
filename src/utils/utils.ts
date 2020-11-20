/**
 *
 * @param params {Object}
 * @description 过滤所有空字符串参数
 */
export const falsyFilter = (params: Record<string, any>) => {
  const filtedParams: Record<string, any> = Object.entries(params).reduce((pre, [key, value]) => {
    if (value || value === 0) {
      return { ...pre, [key]: value }
    } else {
      return pre
    }
  }, {})
  return filtedParams
}
