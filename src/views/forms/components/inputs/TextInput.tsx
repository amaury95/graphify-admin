import { Form, Input } from "antd";
import { capitalise } from "utils/functions";
import { DynamicInputProps } from "../../types";

export default function TextInput({ name, hideLabel }: DynamicInputProps) {
  return (
    <Form.Item
      label={hideLabel ? "" : capitalise(name)}
      name={name}
      // rules={[{ required: true, message: "Please input your username!" }]}
    >
      <Input placeholder={hideLabel ? capitalise(name) : ""} />
    </Form.Item>
  );
}
