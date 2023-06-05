import { MockMethod } from "vite-plugin-mock";

export default [
  // 用户
  {
    url: "/user",
    method: "post",
    response: () => {
      return {
        code: 200,
        message: "success",
        data: {
          list: [
            {
              username: "admin",
              nickname: "admin",
              description: "管理员",
              deptId: 103,
              phone: "15888888888",
              sex: 0,
              id: 1,
              status: 0,
              createTime: 1605456000000,
              dept: {
                id: 103,
                name: "软件工程"
              }
            },
            {
              username: "pure",
              nickname: "pure",
              description: "不要吓我",
              deptId: 104,
              phone: "15888888888",
              sex: 0,
              id: 100,
              status: 1,
              createTime: 1605456000000,
              dept: {
                id: 104,
                name: "市场部门"
              }
            },
            {
              username: "小姐姐",
              nickname: "girl",
              description: null,
              deptId: 106,
              phone: "15888888888",
              sex: 1,
              id: 103,
              status: 1,
              createTime: 1605456000000,
              dept: {
                id: 106,
                name: "财务部门"
              }
            },
            {
              username: "小哥哥",
              nickname: "boy",
              description: null,
              deptId: 107,
              phone: "15888888888",
              sex: 0,
              id: 104,
              status: 0,
              createTime: 1605456000000,
              dept: {
                id: 107,
                name: "运维部门"
              }
            }
          ],
          total: 4
        }
      };
    }
  },
] as MockMethod[];
