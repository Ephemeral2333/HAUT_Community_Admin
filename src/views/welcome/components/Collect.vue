<script setup lang="ts">
import { onMounted, ref } from "vue";
import dayjs from "dayjs";
import { getRandomCollectPost } from "@/api/post";

const list = ref([]);

onMounted(async () => {
    const { data } = await getRandomCollectPost();
    list.value = data;
});
</script>

<template>
    <!--列出所有的点赞文章-->
    <div class="main">
        <article v-if="list.length > 0" v-for="(item, index) in list" :key="index" class="media">
            <div class="media-content">
                <div class="content ellipsis is-ellipsis-1">
                    <el-tooltip class="item" effect="dark" :content="item.title"
                                placement="top">
                        <router-link :to="'/post/detail/' + item.id" style="font-size: 15px;">
                            ⚫︎ {{ item.title }}
                        </router-link>
                    </el-tooltip>
                </div>
            </div>
        </article>
        <div v-else class="no-data">
            <el-empty description="暂无数据"></el-empty>
        </div>
    </div>
</template>

<style>
.media {
    align-items: flex-start;
    display: flex;
    text-align: inherit;
}

.media .content:not(:last-child) {
    margin-bottom: 0.75rem;
}

.media .media {
    border-top: 1px solid rgba(219, 219, 219, 0.5);
    display: flex;
    padding-top: 0.75rem;
}

.media .media .content:not(:last-child),
.media .media .control:not(:last-child) {
    margin-bottom: 0.5rem;
}

.media .media .media {
    padding-top: 0.5rem;
}

.media .media .media + .media {
    margin-top: 0.5rem;
}

.media + .media {
    border-top: 1px solid rgba(219, 219, 219, 0.5);
    margin-top: 1rem;
    padding-top: 1rem;
}

.media.is-large + .media {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
}

.media-left,
.media-right {
    flex-basis: auto;
    flex-grow: 0;
    flex-shrink: 0;
}

.media-left {
    margin-right: 1rem;
}

.media-right {
    margin-left: 1rem;
}

.media-content {
    flex-basis: auto;
    flex-grow: 1;
    flex-shrink: 1;
    text-align: inherit;
}
</style>
