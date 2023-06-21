import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/util";

export type UserResult = {
    code: number;
    message: string;
    data: {
        /** 用户名 */
        username: string;
        /** 当前登陆用户的角色 */
        roles: Array<string>;
        /** `token` */
        accessToken: string;
        /** 用于调用刷新`accessToken`的接口时所需的`token` */
        refreshToken: string;
        /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
        expires: Date;
    };
};

export type RefreshTokenResult = {
    code: number;
    message: string;
    data: {
        /** `token` */
        accessToken: string;
        /** 用于调用刷新`accessToken`的接口时所需的`token` */
        refreshToken: string;
        /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
        expires: Date;
    };
};

export type UserInfoResult = {
    code: number;
    message: string;
    data: {
        /** 邮箱 */
        email: string;
        /** 头像 */
        headUrl: string;
        /** 昵称 */
        nickname: string;
    };
}

/** 登录 */
export const getLogin = (data?: object) => {
    return http.request<UserResult>(
        "post",
        baseUrlApi("admin/system/index/login"),
        { data }
    );
};

/** 刷新token */
export const refreshTokenApi = (data?: object) => {
    return http.request<RefreshTokenResult>("post", "/refreshToken", { data });
};

export const getUserInfo = (data?: object) => {
    return http.request("get", baseUrlApi("admin/system/index/info"), { data });
};

export const modifyPassword = (pass?: string) => {
    return http.request("post", baseUrlApi("admin/system/index/modify/password"), {
        params: {
            pass: pass
        }
    });
};

export const updateProfile = (data?: object) => {
    return http.request("post", baseUrlApi("admin/system/index/update/profile"), { data });
}

export const getCountInfo = () => {
    return http.request("get", baseUrlApi("admin/system/sysUser/count/info"));
}

export const savePhoto = (url: string, id: number) => {
    return http.request("post", baseUrlApi('admin/system/index/savePhoto/' + id), {
        data: {
            url
        }
    });
}
