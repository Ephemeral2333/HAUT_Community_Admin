import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/util";
import { RouteParamValue } from "vue-router";

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

type PostResult = {
  code: number;
  message: string;
  data?: any;
}

export const getMyPost = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("front/post/my"), { data });
}

export const deletePost = (id?: number) => {
  return http.request<Result>("delete", baseUrlApi(`front/post/delete/${id}`));
}

export const getAllPost = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("admin/post/getPageList"), { data });
}

export const getPostById = (id?: string | RouteParamValue[]) => {
  return http.request<PostResult>("get", baseUrlApi(`front/post/${id}`));
}

export const getRandomFavorPost = () => {
  return http.request<PostResult>("get", baseUrlApi(`post/like/random`));
}

export const getMyRandomPost = () => {
  return http.request<PostResult>("get", baseUrlApi(`post/my/random`));
}

export const getRandomCollectPost = () => {
    return http.request<PostResult>("get", baseUrlApi(`post/collect/random`));
}

// 置顶帖子
export const topPost = (id?: number) => {
    return http.request<Result>("post", baseUrlApi(`admin/post/top/${id}`));
}

// 加精帖子
export const essencePost = (id?: number) => {
    return http.request<Result>("post", baseUrlApi(`admin/post/essence/${id}`));
}
