<script setup lang="ts">
import { useTip } from "./utils/hook";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import { ref } from "vue";
import PureTableBar from "@/components/RePureTableBar/src/bar";
import AddFill from "@iconify-icons/ri/add-circle-line";
import EditPen from "@iconify-icons/ep/edit-pen";
import Delete from "@iconify-icons/ep/delete";

defineOptions({
  name: "Tip"
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
  handleDelete,
  openDialog
} = useTip();

</script>

<template>
  <div class="main">
    <el-form
      :inline="true"
      ref="formRef"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="句子内容：" prop="content">
        <el-input
          v-model="form.content"
          placeholder="请输入句子内容"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="句子作者：" prop="author">
        <el-input
          v-model="form.author"
          placeholder="请输入句子作者"
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
        title="每日一句列表"
        :columns="columns"
        @refresh="onSearch">
      <template #buttons>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog()"
        >
          新增每日一句
        </el-button>
      </template>

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
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(EditPen)"
              @click="openDialog('编辑', row, row.id)"
            >
              修改
            </el-button>
            <el-popconfirm
              :title="`是否确认删除投稿人为${row.user}的这条数据`"
              @confirm="handleDelete(row)"
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
