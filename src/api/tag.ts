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

export const getTagList = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("admin/tag/list"), { data });
};

export const saveTag = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("admin/tag/save"), { data });
}

export const deleteTag = (id?: number) => {
  return http.request<Result>("delete", baseUrlApi(`admin/tag/delete/${id}`));
}

export const updateTag = (data?: object, id?: number) => {
  return http.request<Result>("put", baseUrlApi(`admin/tag/update/${id}`), { data });
}
