import { Form, Input } from "antd";
import { getLabel } from "utils/functions";
import { DynamicInputProps } from "../../types";

export default function TextInput({ name, hideLabel }: DynamicInputProps) {
  return (
    <Form.Item
      label={hideLabel ? "" : getLabel(name)}
      name={name}
      // rules={[{ required: true, message: "Please input your username!" }]}
    >
      <Input placeholder={hideLabel ? getLabel(name) : ""} />
    </Form.Item>
  );
}
