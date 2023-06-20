<script setup lang="ts">
import { useTipPost } from "./utils/hook";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import { ref } from "vue";
import PureTableBar from "@/components/RePureTableBar/src/bar";
import AddFill from "@iconify-icons/ri/add-circle-line";
import EditPen from "@iconify-icons/ep/edit-pen";
import Delete from "@iconify-icons/ep/delete";
import { Failed, SuccessFilled } from "@element-plus/icons-vue";

defineOptions({
  name: "TipPost"
});
const formRef = ref();

const {
  form,
  loading,
  onSearch,
  resetForm,
  columns,
  dataList,
  pagination,
  handleChange,
  handlePost,
  openDialog
} = useTipPost();

</script>

<template>
  <div class="main">
    <el-form
      :inline="true"
      ref="formRef"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="投稿内容：" prop="content">
        <el-input
          v-model="form.content"
          placeholder="请输入投稿内容"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="投稿作者：" prop="author">
        <el-input
          v-model="form.author"
          placeholder="请输入投稿作者"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="投稿人：" prop="user">
        <el-input
          v-model="form.user"
          placeholder="请输入投稿人"
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
      title="每日一句投稿审核"
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
          @page-size-change="handleChange"
          @page-current-change="handleChange"
        >
          <template #operation="{ row }">
            <el-popconfirm
              :title="`是否确认通过投稿人为${row.postman}的这条数据`"
              @confirm="handlePost(row.id, 'pass')"
            >
              <template #reference>
                <el-button
                  class="reset-margin"
                  link
                  type="success"
                  :size="size"
                  :icon="useRenderIcon(SuccessFilled)"
                  @click=""
                >
                  接受
                </el-button>
              </template>
            </el-popconfirm>
            <el-popconfirm
              :title="`是否确认拒绝投稿人为${row.postman}的这条数据`"
              @confirm="handlePost(row.id, 'refuse')"
            >
              <template #reference>
                <el-button
                  class="reset-margin"
                  link
                  type="danger"
                  :size="size"
                  :icon="useRenderIcon(Failed)"
                >
                  拒绝
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>
