<template>
    <div class="demo-fit">
        <div :key="'cover'" class="block">
            <el-avatar shape="square" :size="100" :fit="'cover'" :src="url" />
            <br>
            <el-button type="primary" @click="centerDialogVisible = true">更换头像</el-button>
        </div>
        <div class="el-main">
            您好 {{ info.name }}，当前时间为：<span id="time">{{ currentTime }}</span>
            <br>
            <div class="mt-12">
                文章总数：<span id="articleCount">{{ info.articleCount }}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                获赞数：<span id="likeCount">{{ info.likeCount }}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                被收藏数：<span id="collectCount">{{ info.collectCount }}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                总被阅览数：<span id="viewCount">{{ info.viewCount }}</span>
            </div>
        </div>
    </div>

    <el-dialog
        v-model="centerDialogVisible"
        title="更换头像"
        width="30%"
        align-center
    >
            <el-upload
                align="center"
                class="avatar-uploader"
                action="http://localhost:8080/front/file/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="info.avatar" :src="info.avatar" class="avatar"
                    style="width: 96px; height: 96px;">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="confirmAvatar">
          确认
        </el-button>
      </span>
        </template>
    </el-dialog>
</template>


<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getCountInfo, savePhoto } from "@/api/user";
import { message } from "@/utils/message";

const url = ref("https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg");
const info = ref({});
const currentTime = ref(new Date().toLocaleString());
const centerDialogVisible = ref(false)

onMounted(async () => {
    setInterval(() => {
        currentTime.value = new Date().toLocaleString();
    }, 1000);

    // 获取用户信息
    await getCountInfo().then((res) => {
        info.value = res.data;
        url.value = res.data.avatar;
    });
});

async function handleAvatarSuccess(res) {
    info.value.avatar = res.data
    await savePhoto(info.value.avatar, info.value.id)
}

function beforeAvatarUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
        message('上传头像图片只能是 JPG 格式!')
    }
    if (!isLt2M) {
        message('上传头像图片大小不能超过 2MB!')
    }
    return isJPG && isLt2M;
}

function confirmAvatar() {
    centerDialogVisible.value = false
    window.location.reload();
}
</script>

<style scoped>
.demo-fit {
    display: flex;
    text-align: center;
    justify-content: space-between;
}

.demo-fit .block {
    flex: 1;
    display: flex;
    flex-direction: column;
    flex-grow: 0;
}

.demo-fit .title {
    margin-bottom: 10px;
    font-size: 14px;
    color: var(--el-text-color-secondary);
}
</style>
