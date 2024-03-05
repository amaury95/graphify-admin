import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, Typography } from "antd";
import { Element } from "types/schema";
import { mapTypeToComponent } from "./utils";

// Map Types
// string => Input
// int => Num Input
// bytes => Image
// enum (options) => Radio or Select depending on number of options
// mesage => Form

// Map Kind
// list => add elements of type
// map => add elemnts of {key: type, value: type2}

interface CreateNewFormProps {
  schema: Element;
}

export default function CreateNewForm({ schema }: CreateNewFormProps) {
  const [form] = Form.useForm();

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="dynamic_form_complex"
      style={{ maxWidth: 600 }}
      autoComplete="off"
      initialValues={{ items: [{}] }}
    >
      {/* fields */}
      {Object.entries(schema.fields).map(([key, field], index) => {
        if (key === "_key") {
          return null;
        }
        return (
          <div key={"field-" + index + key}>{mapTypeToComponent(field)}</div>
        );
      })}

      {/* stepper for one ofs */}
      {/* <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item> */}
    </Form>
  );
}
