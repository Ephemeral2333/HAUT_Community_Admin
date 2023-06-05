interface FormItemProps {
  higherDeptOptions: Record<string, unknown>[];
  parentId: number;
  username: string;
  email: string;
  sex: number;
  description: string;
  roleIds: number[];
  roleList: Record<string, unknown>[];
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
