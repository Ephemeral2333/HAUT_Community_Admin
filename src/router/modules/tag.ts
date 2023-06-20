export default {
  path: "/tag",
  redirect: "/tag/all/index",
  meta: {
    title: "标签管理",
    icon: "ion:pricetags-sharp"
  },
  children: [
    {
      path: "/tag/all/index",
      name: "AllTag",
      component: () => import("@/views/tag/all-tag/index.vue"),
      meta: {
        title: "标签管理",
        icon: "ion:pricetags-sharp",
        roles: ["admin"]
      }
    }
  ]
};
