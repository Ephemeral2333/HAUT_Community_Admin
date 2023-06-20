import { onMounted, reactive } from "vue";
import { ref } from "vue";
import dayjs from "dayjs";
import { usePublicHooks } from "@/views/system/hooks";
import { PaginationProps } from "@pureadmin/table";
import { deleteTip, getContributeList, passTip, refuseTip } from "@/api/tip";
import { ElMessage } from "element-plus";
import { isAllEmpty } from "@pureadmin/utils";

export function useTipPost() {
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
      label: "投稿人",
      prop: "postman",
      minWidth: 100
    },
    {
      label: "投稿时间",
      minWidth: 200,
      prop: "postTime",
      formatter: ({ postTime }) =>
        dayjs(postTime).format("YYYY-MM-DD HH:mm:ss")
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
    const { data } = await getContributeList(pagination);
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

  async function handlePost(id, type) {
    if(type === 'pass') {
      await passTip(id)
      ElMessage.success('已通过该条投稿')
    } else {
      await refuseTip(id)
      ElMessage.success('已拒绝该条投稿')
    }
    onSearch();
  }

  // 重置表单
  function resetForm(formEl) {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
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
    handlePost
  };
}
