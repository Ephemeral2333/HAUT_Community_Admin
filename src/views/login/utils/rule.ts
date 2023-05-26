import { reactive } from "vue";
import type { FormRules } from "element-plus";

// 密码校验，要求密码必须在6-18之间即可
const REGEXP_PWD = /^.{6,18}$/;

/** 登录校验 */
const loginRules = reactive(<FormRules>{
  password: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else if (!REGEXP_PWD.test(value)) {
          callback(
            new Error("密码格式应为6-18位")
          );
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ]
});

export { loginRules };
