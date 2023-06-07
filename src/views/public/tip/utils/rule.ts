import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  content: [{ required: true, message: "句子内容为必填项", trigger: "blur" }],
  author: [{ required: true, message: "作者为必填项", trigger: "blur" }]
});
