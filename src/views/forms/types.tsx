import { FormListFieldData } from "antd";

export interface DynamicInputProps {
  name: string | any[];
  hideLabel?: boolean;
  props?: FormListFieldData;
}
