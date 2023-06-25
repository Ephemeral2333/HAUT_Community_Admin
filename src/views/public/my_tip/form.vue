<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    content: "",
    author: "",
    user: ""
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-form-item label="句子内容" prop="content">
      <el-input
        v-model="newFormInline.content"
        clearable
        placeholder="请输入句子内容"
      />
    </el-form-item>

    <el-form-item label="作者" prop="author">
      <el-input
        v-model="newFormInline.author"
        clearable
        placeholder="请输入作者"
      />
    </el-form-item>

    <el-form-item label="投稿名称">
      <el-input
        v-model="newFormInline.postman"
        clearable
        placeholder="请输入投稿名称"
      />
    </el-form-item>
  </el-form>
</template>
