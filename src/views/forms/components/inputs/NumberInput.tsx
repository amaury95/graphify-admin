import { Form, InputNumber } from "antd";
import { getLabel } from "utils/functions";
import { DynamicInputProps } from "../../types";

export default function NumberInput({ name }: DynamicInputProps) {
  return (
    <Form.Item
      label={getLabel(name)}
      name={name}
      // rules={[{ required: true, message: "Please input your username!" }]}
    >
      <InputNumber
      //   min={1} max={10} defaultValue={3} onChange={onChange}
      />
    </Form.Item>
  );
}
