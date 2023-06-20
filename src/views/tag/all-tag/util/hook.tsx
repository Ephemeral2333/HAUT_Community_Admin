import { reactive, ref, onMounted, h } from "vue";
import { usePublicHooks } from "@/views/system/hooks";
import { PaginationProps } from "@pureadmin/table";
import { deleteTag, getTagList, saveTag, updateTag } from "@/api/tag";
import { ElMessage } from "element-plus";
import { FormItemProps } from "@/views/tag/all-tag/util/types";
import { addDialog } from "@/components/ReDialog/index";
import editForm from "@/views/tag/all-tag/form.vue";
import { message } from "@/utils/message";

export function useTag() {
  const form = reactive({
    content: ""
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
      minWidth: 80
    },
    {
      label: "标签名称",
      prop: "name",
      minWidth: 300
    },
    {
      label: "标签统计",
      prop: "topicCount",
      minWidth: 300
    },
    {
      label: "操作",
      fixed: "right",
      minWidth: 160,
      slot: "operation"
    }
  ];

  async function onSearch() {
    loading.value = true;
    const { data } = await getTagList(pagination);
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
    await deleteTag(id)
    ElMessage.success("删除成功");
    onSearch();
  }

  onMounted(() => {
    onSearch();
  });

  function openDialog(title = "新增", row?: FormItemProps, id?: number) {
    addDialog({
      title: `${title}标签`,
      props: {
        formInline: {
          name: row?.name ?? ""
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
          message(`您${title}了标签名称为${curData.name}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }

        FormRef.validate(async valid => {
          if (valid) {
            if (title === "新增") {
              const { code } = await saveTag(curData);
              if (code === 200) {
                chores();
              } else {
                message("新增失败", { type: "error" });
              }
            } else {
              const { code } = await updateTag(curData, id);
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

  return {
    form,
    formRef,
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
