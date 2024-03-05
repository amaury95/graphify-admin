import { Form, Select } from "antd";
import { capitalise } from "utils/functions";
import { transformOptions } from "../utils";

interface SelectInputProps {
  name: string;
  options: { [key: string]: string };
}

export default function SelectInput({ name, options }: SelectInputProps) {
  return (
    <Form.Item
      label={capitalise(name)}
      name={name}
      // rules={[{ required: true, message: "Please input your username!" }]}
    >
      <Select options={transformOptions(options)} />
    </Form.Item>
  );
}
