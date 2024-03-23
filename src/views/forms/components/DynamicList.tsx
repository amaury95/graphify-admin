import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Form, Space, Typography } from "antd";
import { Field } from "types/schema";
import { getLabel } from "utils/functions";
import FormInputs, { FormInput } from "./FormInputs";
import ImageUpload from "./inputs/ImageUpload";
import { useEffect } from "react";

const { Text } = Typography;

interface DynamicListProps {
  field: Field;
}

export default function DynamicList({ field }: DynamicListProps) {
  const { name, type, options, optional } = field;

  useEffect(() => {
    console.log(name);
  }, [name]);

  switch (type) {
    case "message":
      return <MessageList field={field} />;
    case "bytes":
      return <BytesList field={field} />;
    default:
      // everythin else
      break;
  }

  return (
    <div>
      <Flex justify="flex-end">
        <Text strong>{getLabel(name)}</Text>
      </Flex>
      <Form.List name={name}>
        {(fields, { add, remove }) => {
          console.log("fields: ", fields)
          return <div style={{ display: "flex", flexDirection: "column", rowGap: 2 }}>
            
            {fields.map(({ key, name: nameN, ...restField }, index) => {
              console.log("nameN: ", nameN);
              console.log("type: ", type);
              return (
                <>
                  <FormInput
                    field={
                      {
                        name: [nameN, index],
                        type,
                        options,
                        optional,
                      } as Field
                    }
                  />
                  <CloseOutlined
                    onClick={() => {
                      remove(nameN);
                    }}
                  />
                </>
              );
            })}
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
        }}
      </Form.List>
    </div>
  );
}

function MessageList({ field }: DynamicListProps) {
  const { name, schema } = field;
  return (
    <div>
      <Flex justify="flex-end">
        <Text strong>{getLabel(name)}</Text>
      </Flex>
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name: nameN, ...restField }) => (
              <Card
                size="small"
                title={`Item ${nameN + 1}`}
                style={{ marginBottom: 8 }}
                key={key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(nameN);
                    }}
                  />
                }
              >
                {schema && <FormInputs schema={schema} />}
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

function BytesList({ field }: DynamicListProps) {
  const { name } = field;

  return <ImageUpload name={name} maxCount={100} />;
}
