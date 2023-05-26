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
              remark: "管理员",
              deptId: 103,
              postIds: [1],
              mobile: "15888888888",
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
              remark: "不要吓我",
              deptId: 104,
              postIds: [1],
              mobile: "15888888888",
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
              remark: null,
              deptId: 106,
              postIds: null,
              mobile: "15888888888",
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
              remark: null,
              deptId: 107,
              postIds: [],
              mobile: "15888888888",
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
  // 部门S
  {
    url: "/dept",
    method: "post",
    response: () => {
      return {
        code: 200,
        message: "success",
        data: [
          {
            name: "河南工业大学莲花街校区",
            parentId: 0,
            id: 100,
            sort: 0,
            principal: "1",
            status: 1, // 状态 1 启用 0 停用
            createTime: 1605456000000,
          },
          {
            name: "人工智能与大数据学院",
            parentId: 100,
            id: 101,
            sort: 1,
            principal: "@cname()",
            status: 1,
            createTime: 1605456000000,
          },
          {
            name: "软件工程",
            parentId: 101,
            id: 103,
            sort: 1,
            principal: "@cname()",
            status: 1,
            createTime: 1605456000000,
            remark: "@cparagraph(1, 3)"
          },
          {
            name: "市场部门",
            parentId: 102,
            id: 108,
            sort: 1,
            principal: "@cname()",
            status: 1,
            createTime: 1605456000000,
            remark: "@cparagraph(1, 3)"
          },
          {
            name: "深圳分公司",
            parentId: 100,
            id: 102,
            sort: 2,
            principal: "@cname()",
            status: 1,
            createTime: 1605456000000,
            remark: "@cparagraph(1, 3)"
          },
          {
            name: "市场部门",
            parentId: 101,
            id: 104,
            sort: 2,
            principal: "@cname()",
            status: 1,
            createTime: 1605456000000,
            remark: "@cparagraph(1, 3)"
          },
          {
            name: "财务部门",
            parentId: 102,
            id: 109,
            sort: 2,
            principal: "@cname()",
            status: 1,
            createTime: 1605456000000,
            remark: "@cparagraph(1, 3)"
          },
          {
            name: "测试部门",
            parentId: 101,
            id: 105,
            sort: 3,
            principal: "@cname()",
            status: 0,
            createTime: 1605456000000,
            remark: "@cparagraph(1, 3)"
          },
          {
            name: "财务部门",
            parentId: 101,
            id: 106,
            sort: 4,
            principal: "@cname()",
            status: 1,
            createTime: 1605456000000,
            remark: "@cparagraph(1, 3)"
          },
          {
            name: "运维部门",
            parentId: 101,
            id: 107,
            sort: 5,
            principal: "@cname()",
            status: 0,
            createTime: 1605456000000,
            remark: "@cparagraph(1, 3)"
          }
        ]
      };
    }
  }
] as MockMethod[];
