import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/util";

type Result = {
  code: number;
  message: string;
  data?: {
    /** 列表数据 */
    list: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    pageSize?: number;
    /** 当前页数 */
    currentPage?: number;
  };
};

export const getTipList = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("admin/tip/getPageList"), { data });
};

export const deleteTip = (data?: object) => {
  return http.request<Result>("delete", baseUrlApi(`admin/tip/delete/${data}`));
}

export const saveTip = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("admin/tip/save"), { data });
}

// @ts-ignore
export const updateTip = (data?: object, id: number) => {
  return http.request<Result>("put", baseUrlApi(`admin/tip/update/${id}`), { data });
}
