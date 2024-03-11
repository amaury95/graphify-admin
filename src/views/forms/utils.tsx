import { Field } from "types/schema";
import TextInput from "./inputs/TextInput";
import ImageUpload from "./inputs/ImageUpload";
import NumberInput from "./inputs/NumberInput";
import RadioInput from "./inputs/RadioInput";
import SelectInput from "./inputs/SelectInput";
import CheckboxInput from "./inputs/CheckboxInput";
import DynamicList from "./inputs/DynamicList";
import DynamicMap from "./inputs/DynamicMap";
import DynamicMessage from "./inputs/DynamicMessage";

export function transformOptions(dictionary: {
  [key: string]: string;
}): { value: string; label: string }[] {
  return Object.keys(dictionary).map((key) => ({
    value: key,
    label: dictionary[key],
  }));
}

export const mapTypeToComponent = (field: Field) => {
  const fkind = field.kind;
  const ftype = field.type;

  switch (fkind) {
    case "map":
      return <DynamicMap />;
    case "list":
      return (
        // @ts-ignore
        <DynamicList name={field.name} type={field.type} value={field.value} />
      );
    default:
      break;
  }

  switch (ftype) {
    case "string":
      return <TextInput name={field.name} />;

    case "bytes":
      return <ImageUpload name={field.name} />;

    case "int32":
      return <NumberInput name={field.name} />;

    case "message":
      return (
        <DynamicMessage
          name={field.name}
          optional={field.optional}
          value={field.value}
        />
      );

    case "enum":
      if (field.options && Object.entries(field.options).length < 4) {
        return <RadioInput name={field.name} options={field.options ?? {}} />;
      } else {
        return <SelectInput name={field.name} options={field.options ?? {}} />;
      }

    case "bool":
      return <CheckboxInput name={field.name} />;

    default:
      return <div></div>;
  }
};
