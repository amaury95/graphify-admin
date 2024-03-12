import { Field } from "types/schema";
import TextInput from "./components/inputs/TextInput";
import ImageUpload from "./components/inputs/ImageUpload";
import NumberInput from "./components/inputs/NumberInput";
import RadioInput from "./components/inputs/RadioInput";
import SelectInput from "./components/inputs/SelectInput";
import CheckboxInput from "./components/inputs/CheckboxInput";
import DynamicList from "./components/DynamicList";
import DynamicMap from "./components/DynamicMap";
import DynamicMessage from "./components/DynamicMessage";

export function transformOptions(dictionary: {
  [key: string]: string;
}): { value: string; label: string }[] {
  return Object.keys(dictionary).map((key) => ({
    value: key,
    label: dictionary[key],
  }));
}

export const mapTypeToComponent = (
  field: Field,
  hideLabel?: boolean,
  props?: any
) => {
  const fkind = field.kind;
  const ftype = field.type;

  switch (fkind) {
    case "map":
      return <DynamicMap field={field} />;
    case "list":
      return (
        // @ts-ignore
        <DynamicList field={field} />
      );
    default:
      break;
  }

  switch (ftype) {
    case "string":
      return <TextInput name={field.name} hideLabel={hideLabel} />;

    case "bytes":
      return <ImageUpload name={field.name} />;

    case "int32":
      return <NumberInput name={field.name} hideLabel={hideLabel} />;

    case "message":
      return (
        <DynamicMessage
          name={field.name}
          optional={field.optional}
          // @ts-ignore
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
