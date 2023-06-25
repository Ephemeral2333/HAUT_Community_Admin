import { onMounted, reactive } from "vue";
import { ref } from "vue";
import dayjs from "dayjs";
import { usePublicHooks } from "@/views/system/hooks";
import { PaginationProps } from "@pureadmin/table";
import { deleteTip, getTipList, myTipList, saveTip, updateMyTip, updateTip } from "@/api/tip";
import { ElMessage } from "element-plus";
import { isAllEmpty } from "@pureadmin/utils";
import { addDialog } from "@/components/ReDialog/index";
import { h } from "vue";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { type FormItemProps } from "../utils/types";

export function MyTip() {
    const form = reactive({
        content: "",
        author: "",
        postman: ""
    });

    const loading = ref(true);
    const formRef = ref();
    const dataList = ref([]);
    const { tagStyle } = usePublicHooks();

    const pagination = reactive<PaginationProps>({
        total: 0,
        pageSize: 5,
        currentPage: 1,
        background: true
    });

    const columns: TableColumnList = [
        {
            label: "ID",
            prop: "id",
            width: 60
        },
        {
            label: "每日一句",
            prop: "content",
            width: 300,
            align: "center",
            showOverflowTooltip: true
        },
        {
            label: "作者",
            prop: "author",
            minWidth: 200,
            align: "center"
        },
        {
            label: "投稿名称",
            prop: "postman",
            minWidth: 100
        },
        {
            label: "状态",
            prop: "type",
            minWidth: 100,
            // formatter: ({ isAccepted }) => {
            //     if (isAccepted === 0) {
            //         return <span style={tagStyle.value(0)}>待审核</span>;
            //     } else if (isAccepted === 1) {
            //         return <span style={tagStyle.value(1)}>审核通过</span>;
            //     } else {
            //         return <span style={tagStyle.value(2)}>审核不通过</span>;
            //     }
            // }
            cellRenderer: ({ row, props }) => (
                <el-tag size={props.size} style={tagStyle.value(row.isAccepted)}>
                    {row.isAccepted === 0 ? "待审核" : row.isAccepted === 1 ? "审核通过" : "审核不通过"}
                </el-tag>
            )
        },
        {
            label: "投稿时间",
            minWidth: 200,
            prop: "createTime",
            formatter: ({ createTime }) =>
                dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
        },
        {
            label: "操作",
            fixed: "right",
            width: 160,
            slot: "operation"
        }
    ];

    function handleChange() {
        onSearch();
    }

    // 搜索
    async function onSearch() {
        loading.value = true;
        const { data } = await myTipList(pagination);
        if (!isAllEmpty(form.content)) {
            data.list = data.list.filter(item => item.content.includes(form.content));
        }
        if (!isAllEmpty(form.author)) {
            data.list = data.list.filter(item => item.author.includes(form.author));
        }
        if (!isAllEmpty(form.postman)) {
            data.list = data.list.filter(item => item.postman.includes(form.postman));
        }
        dataList.value = data.list;
        pagination.total = data.total;
        pagination.pageSize = data.pageSize;
        pagination.currentPage = data.currentPage;

        setTimeout(() => {
            loading.value = false;
        }, 500);
    }

    async function handleDelete(row) {
        await deleteTip(row.id);
        ElMessage.success("删除成功");
        onSearch();
    }

    // 重置表单
    function resetForm(formEl) {
        if (!formEl) return;
        formEl.resetFields();
        onSearch();
    }

    function openDialog(title = "新增", row?: FormItemProps, id?: number) {
        addDialog({
            title: `${title}句子`,
            props: {
                formInline: {
                    content: row?.content ?? "",
                    author: row?.author ?? "",
                    postman: row?.postman ?? ""
                }
            },
            width: "40%",
            draggable: true,
            closeOnClickModal: false,
            contentRenderer: () => h(editForm, { ref: formRef }),
            beforeSure: async (done, { options }) => {
                const FormRef = formRef.value.getRef();
                const curData = options.props.formInline as FormItemProps;

                function chores() {
                    message(`您${title}了作者为${curData.author}的这条数据`, {
                        type: "success"
                    });
                    done(); // 关闭弹框
                    onSearch(); // 刷新表格数据
                }

                FormRef.validate(async valid => {
                    if (valid) {
                        const { code } = await updateMyTip(curData, id);
                        if (code === 200) {
                            chores();
                        } else {
                            message("修改失败", { type: "error" });
                        }
                    }
                });
            }
        });
    }

    onMounted(() => {
        onSearch();
    });

    return {
        form,
        loading,
        onSearch,
        resetForm,
        columns,
        dataList,
        pagination,
        handleChange,
        handleDelete,
        openDialog
    };
}
