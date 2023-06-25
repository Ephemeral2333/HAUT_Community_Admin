<script setup lang="ts">
import { ref } from "vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import PureTableBar from "@/components/RePureTableBar/src/bar";
import Delete from "@iconify-icons/ep/delete";
import { useAllPost } from "@/views/post/all-post/utils/hook";
import Document from "@iconify-icons/ep/document";
import { Star, Top } from "@element-plus/icons-vue";

defineOptions({
    name: "ViewPost"
});

const formRef = ref();

const {
    form,
    loading,
    dataList,
    tagStyle,
    pagination,
    columns,
    onSearch,
    resetForm,
    handleDelete,
    handleTop,
    handleEssence
} = useAllPost();
</script>

<template>
    <div class="main">
        <el-form
            :inline="true"
            ref="formRef"
            :model="form"
            class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
        >
            <el-form-item label="帖子标题：" prop="content">
                <el-input
                    v-model="form.title"
                    placeholder="请输入帖子内容"
                    clearable
                    class="!w-[200px]"
                />
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    :icon="useRenderIcon(Search)"
                    :loading="loading"
                    @click="onSearch"
                >
                    搜索
                </el-button>
                <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
                    重置
                </el-button>
            </el-form-item>
        </el-form>

        <PureTableBar
            title="我的帖子"
            :columns="columns"
            @refresh="onSearch">

            <template v-slot="{ size, dynamicColumns }">
                <pure-table
                    border
                    align-whole="center"
                    showOverflowTooltip
                    table-layout="auto"
                    :loading="loading"
                    :size="size"
                    :data="dataList"
                    :columns="dynamicColumns"
                    :pagination="pagination"
                    :paginationSmall="size === 'small' ? true : false"
                    :header-cell-style="{
            background: 'var(--el-table-row-hover-bg-color)',
            color: 'var(--el-text-color-primary)'
          }"
                    @page-size-change="onSearch"
                    @page-current-change="onSearch"
                >
                    <template #operation="{ row }">
                        <el-button
                            class="reset-margin"
                            link
                            type="primary"
                            :size="size"
                            :icon="useRenderIcon(Document)"
                        >
                            <router-link
                                :to="{
                  name: 'PostDetail',
                  params: {
                    id: row.id
                  }
                }"
                            >
                                查看
                            </router-link>
                        </el-button>

                        <el-button
                            class="reset-margin"
                            link
                            type="primary"
                            :size="size"
                            :icon="useRenderIcon(Top)"
                            @click="handleTop(row.id, row.top)"
                        >
                            <span v-if="row.top">取消置顶</span>
                            <span v-else>置顶</span>
                        </el-button>

                        <el-button
                            class="reset-margin"
                            link
                            type="primary"
                            :size="size"
                            :icon="useRenderIcon(Star)"
                            @click="handleEssence(row.id, row.essence)"
                        >
                            <span v-if="row.essence">取消加精</span>
                            <span v-else>加精</span>
                        </el-button>

                        <el-popconfirm
                            :title="`是否确认删除帖子标题为${row.title}的这条数据`"
                            @confirm="handleDelete(row.id)"
                        >
                            <template #reference>
                                <el-button
                                    class="reset-margin"
                                    link
                                    type="primary"
                                    :size="size"
                                    :icon="useRenderIcon(Delete)"
                                >
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </pure-table>
            </template>
        </PureTableBar>
    </div>
</template>
