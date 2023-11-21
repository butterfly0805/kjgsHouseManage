import request from "@/utils/request";

export function baseTableQuery(pager, req) {
  const params = req.params || {};
  params.page = pager.pageNo;
  params.size = pager.limit;
  return request({
    url: req.url,
    method: "get",
    params: params,
  });
}
