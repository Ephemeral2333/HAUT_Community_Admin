<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { usePublicHooks } from "@/views/system/hooks";

export interface FormProps {
    formInline: {
        nickname: string;
        sex: string;
        description: string;
    };
}

const props = withDefaults(defineProps<FormProps>(), {
    formInline: () => ({
        nickname: "",
        sex: "",
        description: ""
    })
});
const { switchStyle } = usePublicHooks();
const newFormInline = ref(props.formInline);
</script>

<template>
    <el-form :model="newFormInline">
        <el-row :gutter="30">
            <re-col :value="12" :xs="24" :sm="24">
                <el-form-item label="昵称" prop="nickname">
                    <el-input
                        v-model="newFormInline.nickname"
                        clearable
                        placeholder="请输入用户名"
                    />
                </el-form-item>
            </re-col>
            <re-col :value="12" :xs="24" :sm="24">
                <el-form-item label="邮箱">
                    <el-input
                        v-model="newFormInline.email"
                        clearable
                        placeholder="请输入邮箱"
                    />
                </el-form-item>
            </re-col>

            <re-col :value="12" :xs="24" :sm="24">
                <el-form-item label="性别">
                    <el-switch
                        v-model="newFormInline.sex"
                        inline-prompt
                        :active-value="1"
                        :inactive-value="0"
                        active-text="男"
                        inactive-text="女"
                        :style="switchStyle"
                    />
                </el-form-item>
            </re-col>
            <re-col :value="50" :xs="24">
                <el-form-item label="简介">
                    <el-input
                        type="textarea"
                        v-model="newFormInline.description"
                        clearable
                        placeholder="请输入简介"
                        rows="4"
                    />
                </el-form-item>
            </re-col>
        </el-row>
    </el-form>
</template>
