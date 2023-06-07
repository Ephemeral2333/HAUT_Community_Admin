import { onMounted, reactive } from "vue";
import { ref } from "vue";
import dayjs from "dayjs";
import { usePublicHooks } from "@/views/system/hooks";
import { PaginationProps } from "@pureadmin/table";
import { deleteTip, getTipList, saveTip, updateTip } from "@/api/tip";
import { ElMessage } from "element-plus";
import { isAllEmpty } from "@pureadmin/utils";
import { addDialog } from "@/components/ReDialog/index";
import { h } from "vue";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { addRole, updateRole } from "@/api/system";
import { type FormItemProps } from "../utils/types";

export function useTip() {
  const form = reactive({
    content: "",
    author: "",
    user: ""
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
      label: "投稿人",
      prop: "user",
      minWidth: 100
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
    const { data } = await getTipList(pagination);
    if (!isAllEmpty(form.content)) {
      data.list = data.list.filter(item => item.content.includes(form.content));
    }
    if (!isAllEmpty(form.author)) {
      data.list = data.list.filter(item => item.author.includes(form.author));
    }
    if (!isAllEmpty(form.user)) {
      data.list = data.list.filter(item => item.user.includes(form.user));
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
          user: row?.user ?? ""
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
            if (title === "新增") {
              const { code } = await saveTip(curData);
              if (code === 200) {
                chores();
              } else {
                message("新增失败", { type: "error" });
              }
            } else {
              const { code } = await updateTip(curData, id);
              if (code === 200) {
                chores();
              } else {
                message("修改失败", { type: "error" });
              }
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
