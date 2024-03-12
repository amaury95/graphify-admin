import React from "react";
import { Element, Field } from "types/schema";
import { mapTypeToComponent } from "../utils";

interface FormInputsProps {
  schema: Element;
}

export default function FormInputs({ schema }: FormInputsProps) {
  return (
    <div>
      {Object.entries(schema.fields).map(([key, field], index) => {
        if (key === "_key") {
          return null;
        }
        return (
          <div key={"field-" + index + key}>
            <FormInput field={field} />
          </div>
        );
      })}
    </div>
  );
}
interface FormInputProps {
  field: Field;
}
export function FormInput({ field }: FormInputProps) {
  return <div>{mapTypeToComponent(field)}</div>;
}
