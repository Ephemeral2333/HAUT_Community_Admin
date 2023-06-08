import { onMounted, reactive } from "vue";
import { ref } from "vue";
import { usePublicHooks } from "@/views/system/hooks";
import { PaginationProps } from "@pureadmin/table";
import dayjs from "dayjs";
import { isAllEmpty } from "@pureadmin/utils";
import { deleteBillBoard, getBillBoardList, saveBillBoard, updateBillBoard } from "@/api/billboard";
import { FormItemProps } from "@/views/public/tip/utils/types";
import { addDialog } from "@/components/ReDialog/index";
import { h } from "vue";
import editForm from "@/views/public/billboard/form.vue";
import { message } from "@/utils/message";
import { ElMessage } from "element-plus";

export function useBillboard() {
  const form = reactive({
    content: ""
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
      label: "公告内容",
      prop: "content",
      width: 300
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
      width: 160,
      slot: "operation"
    }
  ];

  async function onSearch() {
    loading.value = true;
    const { data } = await getBillBoardList(pagination);
    if (!isAllEmpty(form.content)) {
      data.list = data.list.filter(item => item.content.includes(form.content));
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

  function openDialog(title = "新增", row?: FormItemProps, id?: number) {
    addDialog({
      title: `${title}公告`,
      props: {
        formInline: {
          content: row?.content ?? ""
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
          message(`您${title}了公告内容为${curData.content}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }

        FormRef.validate(async valid => {
          if (valid) {
            if (title === "新增") {
              const { code } = await saveBillBoard(curData);
              if (code === 200) {
                chores();
              } else {
                message("新增失败", { type: "error" });
              }
            } else {
              const { code } = await updateBillBoard(curData, id);
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

  async function handleDelete(id) {
    await deleteBillBoard(id);
    ElMessage.success("删除成功");
    onSearch();
  }

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    dataList,
    tagStyle,
    pagination,
    columns,
    onSearch,
    resetForm,
    openDialog,
    handleDelete
  };
}
