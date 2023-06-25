<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getUserInfo } from "@/api/user";

const userInfo = ref({});
onMounted(async () => {
    await getUserInfo().then(res => {
        userInfo.value = res.data;
    });
});
</script>


<template>
    <el-descriptions
        direction="vertical"
        :column="4"
        border
    >
        <el-descriptions-item label="用户名">
            {{ userInfo.username }}
        </el-descriptions-item>
        <el-descriptions-item label="昵称">
            {{ userInfo.nickname }}
        </el-descriptions-item>
        <el-descriptions-item label="性别" :span="2">
            {{ userInfo.sex == 1 ? "男" : "女" }}
        </el-descriptions-item>
        <el-descriptions-item label="个人简介">
            {{ userInfo.description == null ? "暂无" : userInfo.description }}
        </el-descriptions-item>
        <el-descriptions-item label="邮箱">
            {{ userInfo.email }}
        </el-descriptions-item>
        <el-descriptions-item label="所属部门">
            {{ userInfo.sysDept == null ? "暂无" : userInfo.sysDept.name }}
        </el-descriptions-item>
    </el-descriptions>
</template>
