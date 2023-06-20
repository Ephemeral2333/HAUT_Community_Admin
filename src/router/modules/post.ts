export default {
  path: "/post",
  redirect: "/post/view",
  meta: {
    title: "帖子管理",
    icon: "typcn:document-text"
  },
  children: [
    {
      path: "/post/view",
      name: "ViewPost",
      component: () => import("@/views/post/view/index.vue"),
      meta: {
        title: "我的帖子",
        icon: "bi:file-earmark-post"
      }
    },
    {
      path: "/post/all-post",
      name: "AllPost",
      component: () => import("@/views/post/all-post/index.vue"),
      meta: {
        title: "所有帖子",
        icon: "material-symbols:local-post-office-outline",
        roles: ["admin", "article"]
      }
    },
    {
      path: "/post/detail/:id",
      name: "PostDetail",
      component: () => import("@/views/post/detail/index.vue"),
      meta: {
        title: "帖子详情",
        icon: "bi:file-earmark-post",
        showLink: false
      }
    }
  ]
};
