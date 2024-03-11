import { Form, Input } from "antd";
import { capitalise } from "utils/functions";
import { DynamicInputProps } from "../types";

export default function TextInput({ name }: DynamicInputProps) {
  return (
    <Form.Item
      label={capitalise(name)}
      name={name}
      // rules={[{ required: true, message: "Please input your username!" }]}
    >
      <Input />
    </Form.Item>
  );
}
