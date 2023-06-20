interface FormItemProps {
  /** 角色名称 */
  content: string;
  /** 角色编号 */
  author: string;
  /** 备注 */
  postman: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
