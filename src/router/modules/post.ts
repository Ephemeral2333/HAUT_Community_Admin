export default {
  path: "/post",
  meta: {
    title: "帖子管理",
    icon: "typcn:document-text"
  },
  children: [
    {
      path: "/post/create",
      name: "CreatePost",
      component: () => import("@/views/post/create/index.vue"),
      meta: {
        title: "发布帖子",
        icon: "ic:twotone-post-add"
      }
    },
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
        roles: ["admin"]
      }
    }
  ]
};
