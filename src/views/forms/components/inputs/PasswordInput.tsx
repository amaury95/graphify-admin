import React from "react";
import { capitalise } from "utils/functions";
import { DynamicInputProps } from "../../types";
import { Form, Input } from "antd";

export default function PasswordInput({ name }: DynamicInputProps) {
  return (
    <Form.Item
      label={capitalise(name)}
      name={name}
      // rules={[{ required: true, message: "Please input your username!" }]}
    >
      <Input.Password />
    </Form.Item>
  );
}
