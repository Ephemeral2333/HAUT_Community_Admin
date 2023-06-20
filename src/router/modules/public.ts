export default {
  path: "/public",
  redirect: "/public/billboard",
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
    }
  ]
};
