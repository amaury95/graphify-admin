import React, { useEffect } from "react";

import { Button, Card, Flex, Form, Typography } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";

import FormInputs, { FormInput } from "./FormInputs";
import { capitalise } from "utils/functions";
import { Field } from "types/schema";

const { Text } = Typography;

interface DynamicMapProps {
  field: Field;
}

export default function DynamicMap({ field }: DynamicMapProps) {
  const { name, type, key, value, options, optional } = field;

  useEffect(() => {
    console.log(field);
  }, [field]);

  return (
    <div>
      <Flex justify="flex-end">
        <Text strong>{capitalise(name)}</Text>
      </Flex>
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <>
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
                  // @ts-ignore
                  <FormInputs schema={value.value} />
                ) : (
                  <Flex vertical>
                    {/* key */}
                    <FormInput
                      field={
                        {
                          name: "key",
                          type: key!.type,
                        } as Field
                      }
                    />
                    {/* string */}
                    <FormInput
                      field={
                        {
                          name: "value",
                          // @ts-ignore
                          type: value!.type,
                        } as Field
                      }
                    />
                  </Flex>
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
          </>
        )}
      </Form.List>
    </div>
  );
}
