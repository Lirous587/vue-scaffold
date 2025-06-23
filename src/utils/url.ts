/**
 * 查询参数对象
 */
export interface QueryParams {
  [key: string]: string | number | boolean | null | undefined;
}

/**
 * 将query参数转为url
 * @param query 查询参数对象
 * @returns URL查询字符串
 */
export function queryToUrl(query: QueryParams): string {
  const q: string[] = [];
  for (const key in query) {
    if (query[key] != null && query[key] !== "") {
      q.push(`${key}=${encodeURIComponent(String(query[key]))}`);
    }
  }
  const result = q.join("&");
  return result ? "?" + result : "";
}

/**
 * 解析URL查询字符串
 * @param search URL查询字符串
 * @returns 查询参数对象
 */
export function parseQuery(search: string): QueryParams {
  const query: QueryParams = {};
  const params = new URLSearchParams(search);

  for (const [key, value] of params.entries()) {
    query[key] = value;
  }

  return query;
}
