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

export const getMyPost = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("front/post/my"), { data });
}

export const deletePost = (id?: number) => {
  return http.request<Result>("delete", baseUrlApi(`front/post/delete/${id}`));
}

export const getAllPost = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("admin/post/getPageList"), { data });
}
