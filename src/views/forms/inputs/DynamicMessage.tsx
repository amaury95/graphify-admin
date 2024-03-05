import { Form } from "antd";
import { Element, Field } from "types/schema";
import { capitalise } from "utils/functions";
import { mapTypeToComponent } from "../utils";

interface DynamicMessageProps {
  name: string;
  optional?: boolean;
  value?: Element | Field;
}

export default function DynamicMessage({
  name,
  optional,
  value: schema,
}: DynamicMessageProps) {
  return (
    <Form.Item
      label={capitalise(name)}
      name={name}
      rules={[{ required: optional }]}
    >
      {/* fields */}
      <br />
      {schema &&
        // @ts-ignore
        Object.entries(schema.fields).map(([key, field], index) => {
          return (
            // @ts-ignore
            <div key={"field-" + index + key}>{mapTypeToComponent(field)}</div>
          );
        })}
    </Form.Item>
  );
}
