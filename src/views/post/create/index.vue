<script setup lang="ts">
import Editor from "./Editor.vue";
import { onMounted, ref } from "vue";
import Vditor from "vditor";
defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "CreatePost"
});

const activeNames = ref(["1"]);
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">
          发表帖子
        </span>
      </div>
    </template>
    <el-collapse v-model="activeNames" accordion>
      <Editor />
    </el-collapse>
  </el-card>
</template>

<style lang="scss" scoped>
:deep(.el-collapse-item__header) {
  padding-left: 10px;
}
</style>
