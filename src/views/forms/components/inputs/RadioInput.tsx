import { Form, Radio, Space } from "antd";
import { getLabel } from "utils/functions";

interface SelectInputProps {
  name: string | any[];
  options: { [key: string]: string };
}

export default function RadioInput({ name, options }: SelectInputProps) {
  return (
    <Form.Item
      label={getLabel(name)}
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
