import { Form, Radio, Space } from "antd";
import { capitalise } from "utils/functions";

interface SelectInputProps {
  name: string;
  options: { [key: string]: string };
}

export default function RadioInput({ name, options }: SelectInputProps) {
  return (
    <Form.Item
      label={capitalise(name)}
      name={name}
      // rules={[{ required: true, message: "Please input your username!" }]}
    >
      <Radio.Group
      // onChange={onChange} value={value}
      >
        <Space direction="vertical">
          {Object.entries(options).map(([key, value], index) => {
            return (
              <Radio key={"radio-" + index} value={key}>
                {value}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </Form.Item>
  );
}