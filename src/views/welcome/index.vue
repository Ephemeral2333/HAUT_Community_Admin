<script setup lang="ts">
import dayjs from "dayjs";
import axios from "axios";
import MdEditor from "md-editor-v3";
import My from "./components/My.vue";
import Collect from "./components/Collect.vue";
import Favor from "./components/Favor.vue";
import TypeIt from "@/components/ReTypeit";
import { useWindowSize } from "@vueuse/core";
import { ref, computed, markRaw, h } from "vue";
import Github from "./components/Github.vue";
import { cloneDeep, randomColor } from "@pureadmin/utils";
import { useRenderFlicker } from "@/components/ReFlicker";
import { addDialog } from "@/components/ReDialog/index";
import { message } from "@/utils/message";
import form from "./components/form.vue";
import { getUserInfo, updateProfile } from "@/api/user";
import Avatar, { userInfo } from "@/views/welcome/components/Avatar.vue";

defineOptions({
    name: "Welcome"
});
const list = ref();
const loading = ref<boolean>(true);
const { version } = __APP_INFO__.pkg;
const titleClass = computed(() => {
    return ["text-base", "font-medium"];
});

const { height } = useWindowSize();

setTimeout(() => {
    loading.value = !loading.value;
}, 800);

axios
    .get(
        "https://gitee.com/api/v5/repos/yiming_chang/vue-pure-admin/releases?page=1&per_page=50&direction=desc"
    )
    .then(res => {
        list.value = res.data.map(v => {
            return {
                content: v.body,
                timestamp: dayjs(v.published_at).format("YYYY/MM/DD hh:mm:ss A"),
                icon: markRaw(
                    useRenderFlicker({
                        background: randomColor({ type: "hex" }) as string
                    })
                )
            };
        });
    });

// 更新个人信息
const formInline = ref({
    nickname: "",
    sex: "",
    description: ""
});
const resetFormInline = cloneDeep(formInline.value);

async function openDialog() {
    const { data } = await getUserInfo();
    formInline.value = data;
    addDialog({
        width: "30%",
        title: "更新个人信息",
        contentRenderer: () => h(form, {
            formInline: formInline.value
        }),
        beforeSure: async () => {
            await updateProfile(formInline.value);
            message("更新成功")
            window.location.reload();
            return true;
        },
        closeCallBack: () => {
            formInline.value = cloneDeep(resetFormInline);
        }
    });
}
</script>

<template>
    <div>
        <el-row :gutter="24">
            <el-col
                :xs="24"
                :sm="24"
                :md="12"
                :lg="12"
                :xl="12"
                class="mb-[18px]"
                v-motion
                :initial="{
          opacity: 0,
          y: 100
        }"
                :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 200
          }
        }"
            >
                <el-card
                    shadow="never"
                    :style="{ height: `270px` }"
                >
                    <template #header>
                        <a
                            :class="titleClass"
                            href="https://github.com/pure-admin/vue-pure-admin/releases"
                            target="_black"
                        >
                            <TypeIt
                                :className="'type-it2'"
                                :values="[`个人头像`]"
                                :cursor="false"
                                :speed="60"
                            />
                        </a>
                    </template>
                    <el-skeleton animated :rows="7" :loading="loading">
                        <template #default>
                            <Avatar />
                        </template>
                    </el-skeleton>
                </el-card>
            </el-col>

            <el-col
                :xs="24"
                :sm="24"
                :md="12"
                :lg="12"
                :xl="12"
                class="mb-[18px]"
                v-motion
                :initial="{
          opacity: 0,
          y: 100
        }"
                :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 200
          }
        }"
            >
                <el-card
                    shadow="never"
                    :style="{ height: '270px' }"
                >
                    <template #header>
                        <a
                            :class="titleClass"
                            href="https://github.com/Ephemeral2333"
                            target="_black"
                        >
                            <TypeIt
                                :className="'type-it1'"
                                :values="['个人信息']"
                                :cursor="false"
                                :speed="120"
                            />
                        </a>
                        &nbsp;&nbsp;

                        <el-button
                            type="primary"
                            @click="openDialog">
                            更新个人信息
                        </el-button>
                    </template>
                    <el-skeleton animated :rows="7" :loading="loading">
                        <template #default>
                            <Github />
                        </template>
                    </el-skeleton>
                </el-card>
            </el-col>

            <el-col
                :xs="24"
                :sm="24"
                :md="12"
                :lg="8"
                :xl="8"
                class="mb-[18px]"
                v-motion
                :initial="{
          opacity: 0,
          y: 100
        }"
                :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 400
          }
        }"
            >
                <el-card shadow="never">
                    <template #header>
                        <a
                            :class="titleClass"
                            href="https://github.com/pure-admin/vue-pure-admin"
                            target="_black"
                        >
                            <TypeIt
                                :className="'type-it4'"
                                :values="['点赞文章']"
                                :cursor="false"
                                :speed="120"
                            />
                        </a>
                    </template>
                    <el-skeleton animated :rows="7" :loading="loading">
                        <template #default>
                            <Favor />
                        </template>
                    </el-skeleton>
                </el-card>
            </el-col>

            <el-col
                :xs="24"
                :sm="24"
                :md="12"
                :lg="8"
                :xl="8"
                class="mb-[18px]"
                v-motion
                :initial="{
          opacity: 0,
          y: 100
        }"
                :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 400
          }
        }"
            >
                <el-card shadow="never">
                    <template #header>
                        <a
                            :class="titleClass"
                            href="https://github.com/pure-admin/vue-pure-admin"
                            target="_black"
                        >
                            <TypeIt
                                :className="'type-it3'"
                                :values="['收藏文章']"
                                :cursor="false"
                                :speed="120"
                            />
                        </a>
                    </template>
                    <el-skeleton animated :rows="7" :loading="loading">
                        <template #default>
                            <Collect />
                        </template>
                    </el-skeleton>
                </el-card>
            </el-col>

            <el-col
                :xs="24"
                :sm="24"
                :md="24"
                :lg="8"
                :xl="8"
                class="mb-[18px]"
                v-motion
                :initial="{
          opacity: 0,
          y: 100
        }"
                :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 400
          }
        }"
            >
                <el-card shadow="never">
                    <template #header>
                        <a
                            :class="titleClass"
                            href="https://github.com/pure-admin/vue-pure-admin"
                            target="_black"
                        >
                            <TypeIt
                                :className="'type-it5'"
                                :values="['我的文章']"
                                :cursor="false"
                                :speed="120"
                            />
                        </a>
                    </template>
                    <el-skeleton animated :rows="7" :loading="loading">
                        <template #default>
                            <My />
                        </template>
                    </el-skeleton>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<style lang="scss" scoped>
:deep(.el-timeline-item) {
    margin: 6px 0 0 6px;
}

.main-content {
    margin: 20px 20px 0 !important;
}
</style>
