import { onMounted, reactive, ref } from "vue";
import { usePublicHooks } from "@/views/system/hooks";
import dayjs from "dayjs";
import { deletePost, getMyPost } from "@/api/post";
import { isAllEmpty } from "@pureadmin/utils";
import { PaginationProps } from "@pureadmin/table";
import { ElMessage } from "element-plus";

export function useMyPost() {
  const form = reactive({
    title: ""
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
    const { data } = await getMyPost(pagination);
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
    handleDelete
  }
}
