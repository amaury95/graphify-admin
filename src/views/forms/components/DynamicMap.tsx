import { Button, Card, Flex, Form, Typography } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";

import FormInputs, { FormInput } from "./FormInputs";
import { capitalise, getLabel } from "utils/functions";
import { Field } from "types/schema";
import { useEffect } from "react";

const { Text } = Typography;

interface DynamicMapProps {
  field: Field;
}

export default function DynamicMap({ field }: DynamicMapProps) {
  const { name, key, value } = field;

  useEffect(() => {
    console.log(field);
  }, [field]);

  return (
    <div>
      <Flex justify="flex-end">
        <Text strong>{getLabel(name)}</Text>
      </Flex>
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
            {fields.map(({ key: keyN, name: nameN, ...restField }) => (
              <Card
                size="small"
                title={`Item ${nameN + 1}`}
                style={{ marginBottom: 8 }}
                key={keyN}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(nameN);
                    }}
                  />
                }
              >
                {(value as Field)?.type === "message" ? (
                  <FormInputs schema={value!.schema!} />
                ) : (
                  <>
                    {/* key */}
                    <FormInput
                      field={
                        {
                          name: [nameN, "key"],
                          type: key!.type,
                        } as Field
                      }
                    />
                    {/* string */}
                    <FormInput
                      field={
                        {
                          name: [nameN, "value"],
                          type: value!.type,
                        } as Field
                      }
                    />
                  </>
                )}
              </Card>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
                style={{ width: "100%" }}
              >
                Add field
              </Button>
            </Form.Item>
          </div>
        )}
      </Form.List>
    </div>
  );
}
