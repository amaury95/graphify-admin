import { Flex, Typography } from "antd";
import { Element } from "types/schema";
import { capitalise } from "utils/functions";
import FormInputs from "./FormInputs";

const { Text } = Typography;

interface DynamicMessageProps {
  name: string;
  optional?: boolean;
  schema?: Element;
}

export default function DynamicMessage({
  name,
  optional,
  schema,
}: DynamicMessageProps) {
  return (
    <div>
      <Flex justify="flex-end">
        <Text strong>
          {capitalise(name)} {optional ? "" : "*"}
        </Text>
      </Flex>

      {/* fields */}
      {schema && <FormInputs schema={schema} />}
    </div>
  );
}
