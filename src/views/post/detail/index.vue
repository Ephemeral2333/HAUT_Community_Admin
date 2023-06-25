<script setup>
import { onMounted, ref } from "vue";
import { deletePost, getPostById } from "@/api/post";
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import { ElMessage } from "element-plus";

defineOptions({
    name: "ArticleDetail"
});
// 文章内容
const id = useRoute().params.id;
const articleDetail = ref({
    title: "",
    content: "",
    createTime: "",
    author: {},
    view: 0
});
onMounted(async () => {
    const { data } = await getPostById(id);
    articleDetail.value = data;
    console.log(articleDetail.value);
});
const handleDelete = async (id) => {
    await deletePost(id);
    ElMessage.success("删除成功");
    window.history.back();
};

const username = ref("");
onMounted(() => {
    username.value = localStorage.getItem("username");
});
</script>

<template>
    <div class="main">
        <el-card>
            <el-button
                type="primary"
                @click="$router.go(-1)"
            >返回
            </el-button>
            &nbsp;
            <el-popconfirm
                :title="`是否确认删除标题为'${articleDetail.title}'的这条数据`"
                @confirm="handleDelete(articleDetail.id)"
            >
                <template #reference>
                    <el-button
                        v-if="username === articleDetail.author.username"
                        type="danger"
                    >
                        删除
                    </el-button>
                </template>
            </el-popconfirm>
        </el-card>
        <el-card
            class="box-card"
            shadow="never"
        >
            <div
                slot="header"
                class="has-text-centered"
            >
                <h2 class="is-size-5 has-text-weight-bold">{{ articleDetail.title }}</h2>
                <div class="has-text-grey is-size-7 mt-3">
                    <span>发布时间：{{ dayjs(articleDetail.createTime).format("YYYY/MM/DD HH:mm:ss") }}</span>
                    <el-divider direction="vertical" />
                    <span>发布者：{{ articleDetail.author.nickname }}</span>
                    <el-divider direction="vertical" />
                    <span>浏览：{{ articleDetail.view }} 次</span>
                </div>
            </div>

            <v-md-preview :text="articleDetail.content"></v-md-preview>

            <nav class="level has-text-grey is-size-7 mt-6">
                <div class="level-left">
                    <p class="level-item">
                        <el-tag
                            v-for="(tag, index) in articleDetail.tags"
                            :key="index"
                            type="success"
                            size="mini"
                            class="mr-1"
                        >
                            {{ "#" + tag.name }}
                        </el-tag>
                    </p>
                    <br>
                </div>
            </nav>
        </el-card>
    </div>
</template>


