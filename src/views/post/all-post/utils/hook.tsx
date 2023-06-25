import { onMounted, reactive, ref } from "vue";
import { usePublicHooks } from "@/views/system/hooks";
import dayjs from "dayjs";
import { deletePost, essencePost, getAllPost, topPost } from "@/api/post";
import { isAllEmpty } from "@pureadmin/utils";
import { PaginationProps } from "@pureadmin/table";
import { ElMessage } from "element-plus";

export function useAllPost() {
    const form = reactive({
        title: ""
    });

    const loading = ref(true);
    const formRef = ref();
    const dataList = ref([]);
    const { tagStyle } = usePublicHooks();

    const pagination = reactive<PaginationProps>({
        total: 0,
        pageSize: 10,
        currentPage: 1,
        background: true
    });

    const columns: TableColumnList = [
        {
            label: "序号",
            type: "index",
            width: 80
        },
        {
            label: "帖子标题",
            prop: "title",
            width: 300
        },
        {
            label: "浏览量",
            prop: "view",
            width: 100
        },
        {
            label: "点赞数",
            prop: "favor",
            width: 100
        },
        {
            label: "收藏数",
            prop: "collects",
            width: 100
        },
        {
            label: "是否置顶",
            prop: "top",
            cellRenderer: ({ row, props }) => (
                <el-tag size={props.size} style={tagStyle.value(row.top === true ? 1 : 0)}>
                    {row.top === true ? "是" : "否"}
                </el-tag>
            ),
            width: 100
        },
        {
            label: "是否精华",
            prop: "essence",
            cellRenderer: ({ row, props }) => (
                <el-tag size={props.size} style={tagStyle.value(row.essence === true ? 1 : 0)}>
                    {row.essence === true ? "是" : "否"}
                </el-tag>
            )
        },
        {
            label: "作者",
            prop: "author.username",
            width: 200
        },
        {
            label: "发布时间",
            minWidth: 200,
            prop: "createTime",
            formatter: ({ createTime }) =>
                dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
        },
        {
            label: "修改时间",
            minWidth: 200,
            prop: "updateTime",
            formatter: ({ updateTime }) =>
                dayjs(updateTime).format("YYYY-MM-DD HH:mm:ss")
        },
        {
            label: "操作",
            fixed: "right",
            width: 320,
            slot: "operation"
        }
    ];

    async function onSearch() {
        loading.value = true;
        const { data } = await getAllPost(pagination);
        if (!isAllEmpty(form.title)) {
            data.list = data.list.filter(item => item.title.includes(form.title));
        }

        dataList.value = data.list;
        pagination.total = data.total;
        pagination.pageSize = data.pageSize;
        pagination.currentPage = data.currentPage;

        setTimeout(() => {
            loading.value = false;
        }, 500);
    }

    function resetForm(formEl) {
        if (!formEl) return;
        formEl.resetFields();
        onSearch();
    }

    async function handleDelete(id) {
        await deletePost(id);
        ElMessage.success("删除成功");
        onSearch();
    }

    onMounted(() => {
        onSearch();
    });

    async function handleTop(id, top) {
        await topPost(id);
        ElMessage.success(top === true ? "取消置顶成功" : "置顶成功");
        onSearch();
    }

    async function handleEssence(id, essence) {
        await essencePost(id);
        ElMessage.success(essence === true ? "取消精华成功" : "精华成功");
        onSearch();
    }

    return {
        form,
        loading,
        formRef,
        dataList,
        tagStyle,
        pagination,
        columns,
        onSearch,
        resetForm,
        handleDelete,
        handleTop,
        handleEssence
    };
}
