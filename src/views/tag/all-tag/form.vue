<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./util/rule";
import { FormProps } from "./util/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    name: ""
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
    <el-form-item label="标签名称" prop="content">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入标签名称"
      />
    </el-form-item>
  </el-form>
</template>
