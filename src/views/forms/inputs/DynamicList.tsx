import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Form, Input, Space, Typography } from "antd";
import { Element, FieldType } from "types/schema";
import { capitalise } from "utils/functions";
import { mapTypeToComponent } from "../utils";

interface DynamicListProps {
  name: string;
  type: FieldType;
  value: Element;
}
export default function DynamicList({
  name,
  type,
  value: schema,
}: DynamicListProps) {
  return (
    <Flex>
      <Typography>{capitalise(name)}</Typography>
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
            {fields.map((field) => (
              <Card
                size="small"
                title={`Item ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >
                {schema &&
                  Object.entries(schema.fields).map(([key, field], index) => {
                    return (
                      <div key={"field-" + index + key}>
                        <Form.Item label="Name" name={[field.name, "name"]}>
                          {mapTypeToComponent(field)}
                        </Form.Item>
                      </div>
                    );
                  })}

                {/* Nest Form.List */}
                <Form.Item label="List">
                  <Form.List name={[field.name, "list"]}>
                    {(subFields, subOpt) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          rowGap: 16,
                        }}
                      >
                        {subFields.map((subField) => (
                          <Space key={subField.key}>
                            <Form.Item noStyle name={[subField.name, "first"]}>
                              <Input placeholder="first" />
                            </Form.Item>
                            <Form.Item noStyle name={[subField.name, "second"]}>
                              <Input placeholder="second" />
                            </Form.Item>
                            <CloseOutlined
                              onClick={() => {
                                subOpt.remove(subField.name);
                              }}
                            />
                          </Space>
                        ))}
                        <Button
                          type="dashed"
                          onClick={() => subOpt.add()}
                          block
                        >
                          + Add Sub Item
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Form.Item>
              </Card>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Add Item
            </Button>
          </div>
        )}
      </Form.List>
    </Flex>
  );
}
