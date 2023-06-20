export default {
  path: "/tip",
  redirect: "/tip/post",
  meta: {
    title: "每日一句管理",
    icon: "game-icons:bugle-call"
  },
  children: [
    {
      path: "/tip/post",
      name: "TipPost",
      component: () => import("@/views/public/tip_post/index.vue"),
      meta: {
        title: "投稿审核",
        roles: ["admin", "tip"],
        icon: "material-symbols:checklist-rounded"
      }
    },
    {
      path: "/public/tip",
      name: "Tip",
      component: () => import("@/views/public/tip/index.vue"),
      meta: {
        title: "列表管理",
        roles: ["admin", "tip"],
        icon:"material-symbols:tips-and-updates-rounded"
      }
    }
  ]
};
