export default {
  path: "/public",
  meta: {
    title: "公告管理",
    icon: "game-icons:bugle-call"
  },
  children: [
    {
      path: "/public/billboard",
      name: "Billboard",
      component: () => import("@/views/public/billboard/index.vue"),
      meta: {
        title: "公告管理",
        roles: ["admin"],
        icon: "emojione-v1:loudspeaker"
      }
    },
    {
      path: "/public/tip",
      name: "Tip",
      component: () => import("@/views/public/tip/index.vue"),
      meta: {
        title: "每日一句管理",
        roles: ["admin"],
        icon:"material-symbols:tips-and-updates-rounded"
      }
    }
  ]
};
