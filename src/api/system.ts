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

type ResultRole = {
  code: number;
  message: string;
  data?: {
    roleName: string;
    roleCode: string;
    description: string;
  };
};

type ResultDept = {
  code: number;
  message: string;
  data?: Array<any>;
};

/** 获取用户管理列表 */
export const getUserList = (data?: object) => {
  return http.request<Result>("post", "/user", { data });
};

/** 获取角色管理列表 */
export const getRoleList = (data?: object) => {
  return http.request<Result>(
    "post",
    baseUrlApi("admin/system/sysRole/getPageList"),
    {
      data
    }
  );
};

/** 删除角色 */
export const deleteRole = (data?: object) => {
  return http.request<Result>(
    "delete",
    baseUrlApi(`admin/system/sysRole/remove/${data}`)
  );
};
/** 新增角色 */
export const addRole = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("admin/system/sysRole/save"), {
    data
  });
};

// @ts-ignore
export const updateRole = (data?: object, id: number) => {
  return http.request<Result>(
    "put",
    baseUrlApi(`admin/system/sysRole/update/${id}`),
    {
      data
    }
  );
};

export const getRoleDetail = (data?: string) => {
  return http.request<ResultRole>(
    "get",
    baseUrlApi(`admin/system/sysRole/get/${data}`)
  );
};

/** 获取部门管理列表 */
export const getDeptList = (data?: object) => {
  return http.request<ResultDept>("post", "/dept", { data });
};
