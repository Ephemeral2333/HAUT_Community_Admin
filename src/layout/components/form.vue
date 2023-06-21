<script setup lang="ts">
import { ref } from "vue";

export interface FormProps {
    formInline: {
        password: "",
        pass2word: ""
    };
}

const props = withDefaults(defineProps<FormProps>(), {
    formInline: () => ({
        password: "",
        pass2word: ""
    })
});

const newFormInline = ref(props.formInline);
</script>

<template>
    <el-form :model="newFormInline">
        <el-form-item label="密码">
            <el-input
                class="!w-[220px]"
                v-model="newFormInline.password"
                placeholder="请输入密码"
                show-password
            />
        </el-form-item>
        <el-form-item label="确认密码">
            <el-input
                class="!w-[220px]"
                v-model="newFormInline.pass2word"
                placeholder="请输入确认密码"
                show-password
            />
        </el-form-item>
    </el-form>
</template>
