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

export const getBillBoardList = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("admin/billboard/getPageList"), { data });
};

export const saveBillBoard = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("admin/billboard/save"), { data });
}

// @ts-ignore
export const updateBillBoard = (data?: object, id: number) => {
  return http.request<Result>("put", baseUrlApi(`admin/billboard/update/${id}`), { data });
}

export const deleteBillBoard = (id: number) => {
  return http.request<Result>("delete", baseUrlApi(`admin/billboard/delete/${id}`));
}
