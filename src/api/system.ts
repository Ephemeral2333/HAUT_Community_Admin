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
  return http.request<Result>("post", baseUrlApi("admin/system/sysUser/getPageList"), { data });
};

/** 保存用户 */
export const saveUser = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("admin/system/sysUser/save"), { data });
}

/** 更新用户 */
// @ts-ignore
export const updateUser = (data?: object, id: number) => {
  return http.request<Result>("put", baseUrlApi(`admin/system/sysUser/update/${id}`), { data });
}

/** 更新用户状态 */
export const updateUserStatus = (id:number, status:number) => {
  return http.request<Result>("put", baseUrlApi(`admin/system/sysUser/updateStatus/${id}/${status}`));
}

/** 删除用户 */
export const deleteUser = (data?: object) => {
  return http.request<Result>("delete", baseUrlApi(`admin/system/sysUser/remove/${data}`));
}

/** 重置密码 */
export const resetUserPassword = (data?: object) => {
  return http.request<Result>("put", baseUrlApi(`admin/system/sysUser/resetPassword/${data}`));
}

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

/** 获取所有角色列表 */
export const getAllRoleList = () => {
  const result = http.request<Result>("get", baseUrlApi("admin/system/sysRole/findAll"));
  // 获取result中的data
  return result.then(res => res.data);
}

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

/** 获取部门管理列表 */
export const getDeptList = (data?: object) => {
  return http.request<ResultDept>("get", baseUrlApi("admin/system/dept/list"), { data });
};

export const addDept = (data?: object) => {
  return http.request<ResultDept>("post", baseUrlApi("admin/system/dept/save"), { data });
}

// @ts-ignore
export const updateDept = (data?: object, id: number) => {
  return http.request<Result>(
    "put",
    baseUrlApi(`admin/system/dept/update/${id}`),
    {
      data
    }
  );
};

export const deleteDept = (data?: object) => {
  return http.request<ResultDept>("delete", baseUrlApi(`admin/system/dept/delete/${data}`));
}
