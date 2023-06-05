import dayjs from "dayjs";
import { message } from "@/utils/message";
import {
  deleteUser, getAllRoleList,
  getDeptList,
  getUserList, resetUserPassword,
  saveUser,
  updateUser,
  updateUserStatus
} from "@/api/system";
import { ElMessageBox } from "element-plus";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, computed, onMounted, toRaw, h } from "vue";
import { cloneDeep, isAllEmpty } from "@pureadmin/utils";
import { FormItemProps } from "@/views/system/user/util/types";
import { addDialog } from "@/components/ReDialog/index";
import editForm from "@/views/system/user/form.vue";
import { handleTree } from "@/utils/tree";

export function useUser() {
  const dataList = ref([]);
  const loading = ref(true);
  const formRef = ref();
  const assignRoleFormRef = ref();
  const switchLoadMap = ref({});
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 5,
    currentPage: 1,
    background: true
  });
  const form = reactive({
    username: "",
    email: "",
    status: "",
    dept: "",
    nickname: ""
  });
  const columns: TableColumnList = [
    {
      label: "序号",
      type: "index",
      width: 70,
    },
    {
      label: "用户名",
      prop: "username",
      width: 150,
      showOverflowTooltip: true
    },
    {
      label: "用户昵称",
      prop: "nickname",
      width: 150,
      showOverflowTooltip: true
    },
    {
      label: "性别",
      prop: "sex",
      minWidth: 90,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.sex === 0 ? "danger" : ""}
          effect="plain"
        >
          {row.sex === 0 ? "女" : "男"}
        </el-tag>
      )
    },
    {
      label: "部门",
      prop: "dept",
      width: 300,
      formatter: ({ sysDept }) => sysDept.name,
      showOverflowTooltip: true
    },
    {
      label: "邮箱",
      prop: "email",
      width: 200,
      showOverflowTooltip: true
    },
    {
      label: "角色",
      // 遍历roleList数组，返回角色名称，用逗号拼接
      formatter: ({ roleList }) =>
        roleList.map((item) => item.name).join(","),
      width: 200,
      showOverflowTooltip: true
    },
    {
      label: "备注",
      prop: "description",
      width: 200,
      showOverflowTooltip: true
    },
    {
      label: "状态",
      prop: "status",
      minWidth: 90,
      cellRenderer: scope => (
        <el-switch
          size={scope.props.size === "small" ? "small" : "default"}
          loading={switchLoadMap.value[scope.index]?.loading}
          v-model={scope.row.status}
          active-value={1}
          inactive-value={0}
          active-text="已开启"
          inactive-text="已关闭"
          inline-prompt
          onChange={() => onChange(scope as any)}
        />
      )
    },
    {
      label: "创建时间",
      width: 200,
      prop: "createTime",
      formatter: ({ updateTime }) =>
        dayjs(updateTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 180,
      slot: "operation"
    }
  ];
  const buttonClass = computed(() => {
    return [
      "!h-[20px]",
      "reset-margin",
      "!text-gray-500",
      "dark:!text-white",
      "dark:hover:!text-primary"
    ];
  });

  function onChange({ row, index }) {
    ElMessageBox.confirm(
      `确认要<strong>${
        row.status === 0 ? "停用" : "启用"
      }</strong><strong style='color:var(--el-color-primary)'>${
        row.username
      }</strong>用户吗?`,
      "系统提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        dangerouslyUseHTMLString: true,
        draggable: true
      }
    )
      .then(async () => {
        // 调用接口修改用户状态
        const { code } = await updateUserStatus(row.id, row.status);
        switchLoadMap.value[index] = Object.assign(
          {},
          switchLoadMap.value[index],
          {
            loading: true
          }
        );
        setTimeout(() => {
          switchLoadMap.value[index] = Object.assign(
            {},
            switchLoadMap.value[index],
            {
              loading: false
            }
          );
          message("已成功修改用户状态", {
            type: "success"
          });
        }, 300);
      })
      .catch(() => {
        row.status === 0 ? (row.status = 1) : (row.status = 0);
      });
  }

  function formatHigherDeptOptions(treeList) {
    // 根据返回数据的status字段值判断追加是否禁用disabled字段，返回处理后的树结构，用于上级部门级联选择器的展示（实际开发中也是如此，不可能前端需要的每个字段后端都会返回，这时需要前端自行根据后端返回的某些字段做逻辑处理）
    if (!treeList || !treeList.length) return;
    const newTreeList = [];
    for (let i = 0; i < treeList.length; i++) {
      treeList[i].disabled = treeList[i].status === 0 ? true : false;
      formatHigherDeptOptions(treeList[i].children);
      newTreeList.push(treeList[i]);
    }
    return newTreeList;
  }

  async function openDialog(title = "新增", row?: FormItemProps, id?: number) {
    const { data } = await getDeptList();
    const newData = handleTree(data);
    addDialog({
      title: `${title}用户`,
      props: {
        formInline: {
          higherDeptOptions: formatHigherDeptOptions(cloneDeep(newData)),
          parentId: row?.parentId ?? 0,
          username: row?.username ?? "",
          email: row?.email ?? "",
          sex: row?.sex ?? 0,
          description: row?.description ?? "",
          roleList: await getAllRoleList(),
        }
      },
      width: "40%",
      draggable: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;

        function chores() {
          message(`您${title}了用户名称为${curData.username}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }

        FormRef.validate(async valid => {
          if (valid) {
            if (title === "新增") {
              const { code } = await saveUser(curData);
              if (code === 200) {
                chores();
              }
            } else {
              const { code } = await updateUser(curData, id);
              if (code === 200) {
                chores();
              }
            }
          }
        });
      }
    });
  }

  function handleUpdate(row) {
    console.log(row);
  }

  function resetPassword(row) {
    // 询问是否重置密码
    ElMessageBox.confirm(
      `确认要重置<strong style='color:var(--el-color-primary)'>${row.username}</strong>用户的密码吗?`,
      "系统提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        dangerouslyUseHTMLString: true,
        draggable: true
      })
      .then(async () => {
        const { code } = await resetUserPassword(row.id);
        if (code === 200) {
          message(`您已重置了用户名称为${row.username}的密码`, {
            type: "success"
          });
        }
      })
  }

  async function handleDelete(row) {
    const { code } = await deleteUser(row.id);
    if (code === 200) {
      message(`您删除了用户名称为${row.username}的这条数据`, { type: "success" });
      await onSearch();
    }
  }

  async function handleChange(val: number) {
    const { data } = await getUserList(pagination);
    dataList.value = data.list;
    pagination.total = data.total;
    pagination.pageSize = data.pageSize;
    pagination.currentPage = data.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getUserList(pagination);
    let newData = data;
    if (!isAllEmpty(form.username)) {
      newData.list = newData.list.filter(item => item.username.includes(form.username));
    }
    if (!isAllEmpty(form.status)) {
      newData.list = newData.list.filter(item => item.status.toString() === form.status);
    }
    if(!isAllEmpty(form.email)) {
      newData.list = newData.list.filter(item => item.email.includes(form.email));
    }
    if(!isAllEmpty(form.nickname)) {
      newData.list = newData.list.filter(item => item.nickname.includes(form.nickname));
    }
    if(!isAllEmpty(form.dept)) {
      newData.list = newData.list.filter(item => item.sysDept.name.includes(form.dept));
    }
    dataList.value = data.list;
    pagination.total = data.total;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    pagination,
    buttonClass,
    onSearch,
    resetForm,
    handleUpdate,
    handleDelete,
    handleChange,
    handleSelectionChange,
    openDialog,
    resetPassword
  };
}
