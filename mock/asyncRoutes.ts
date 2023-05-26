// 模拟后端动态生成路由
import { MockMethod } from "vite-plugin-mock";

/**
 * roles：页面级别权限，这里模拟二种 "admin"、"common"
 * admin：管理员角色
 * common：普通角色
 */

const selfCenterRouter = {
  path: "/SelfCenter",
  meta: {
    title: "个人中心",
    icon: "lollipop",
    rank: 10
  },
  children: [
    {
      path: "/SelfCenter/index",
      name: "SelfCenter",
      meta: {
        title: "个人中心"
      }
    }
  ]
};

export default [
  {
    url: "/getAsyncRoutes",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "success",
        data: []
      };
    }
  }
] as MockMethod[];
