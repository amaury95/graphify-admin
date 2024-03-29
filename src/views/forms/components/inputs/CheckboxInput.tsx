import { Checkbox, Form } from "antd";
import { getLabel } from "utils/functions";
import { DynamicInputProps } from "../../types";

export default function CheckboxInput({ name }: DynamicInputProps) {
  return (
    <Form.Item
      label={getLabel(name)}
      name={name}
      // rules={[{ required: true, message: "Please input your username!" }]}
    >
      <Checkbox
      //   onChange={onChange}
      >
        True
      </Checkbox>
    </Form.Item>
  );
}
