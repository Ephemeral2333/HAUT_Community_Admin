// 最简代码，也就是这些字段必须有
export default {
  path: "/system",
  meta: {
    icon: "fluent:settings-cog-multiple-20-filled",
    title: "系统管理"
  },
  children: [
    {
      path: "/system/user/index",
      name: "sysUser",
      component: () => import("@/views/system/user/index.vue"),
      meta: {
        icon: "fluent:people-32-regular",
        title: "用户管理",
        roles: ["admin"]
      }
    },
    {
      path: "/system/dept/index",
      name: "sysDept",
      component: () => import("@/views/system/dept/index.vue"),
      meta: {
        icon: "fluent:building-32-filled",
        title: "院系管理",
        roles: ["admin"]
      }
    },
    {
      path: "/system/role/index",
      name: "sysRole",
      component: () => import("@/views/system/role/index.vue"),
      meta: {
        icon: "fluent:person-accounts-24-filled",
        title: "角色管理",
        roles: ["admin"]
      }
    }
  ]
};
