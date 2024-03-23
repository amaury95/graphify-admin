import { Form, Select } from "antd";
import { getLabel } from "utils/functions";
import { transformOptions } from "../../utils";

interface SelectInputProps {
  name: string | any[];
  options: { [key: string]: string };
}

export default function SelectInput({ name, options }: SelectInputProps) {
  return (
    <Form.Item
      label={getLabel(name)}
      name={name}
      // rules={[{ required: true, message: "Please input your username!" }]}
    >
      <Select options={transformOptions(options)} />
    </Form.Item>
  );
}
