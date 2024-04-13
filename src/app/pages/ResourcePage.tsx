import { useSchema } from "provider/Schema";
import { Navigate, useParams } from "react-router-dom";
import { Element, Field } from "utils/schema";
import { useObject, Nested } from "../../utils/useObject";
import { StackViewProvider, useStackView } from "../../provider/StackView";
import { useState } from "react";

export function ResourcePage() {
  const { nodes } = useSchema();
  const { resource } = useParams();
  const nested = useObject({});

  if (!resource || !nodes[resource]) return <Navigate to="/" />;

  return (
    <>
      <StackViewProvider>
        <Form definition={nodes[resource]} {...nested} path={[]} />
      </StackViewProvider>
      <div>{JSON.stringify({ value: nested.get([]) })}</div>
    </>
  );
}

interface FormProps<T> extends Nested {
  path: (string | number)[]; // Path to set the current value
  definition: T; // Schema definition for the element
}

function Form({ path, definition, ...nested }: FormProps<Element>) {
  return (
    <div>
      {Object.entries(definition.fields)
        .filter(([name]) => !["_key", "_from", "_to"].includes(name))
        .map(([name, field]) => (
          <>
            {field.kind === "list" ? (
              <ListField
                key={name}
                definition={field}
                path={[...path, field.name]}
                {...nested}
              />
            ) : field.kind === "map" ? (
              <MapField
                key={name}
                definition={field}
                path={[...path, field.name]}
                {...nested}
              />
            ) : (
              <FormField
                key={name}
                definition={field}
                path={[...path, field.name]}
                {...nested}
              />
            )}
          </>
        ))}
    </div>
  );
}

function ListField({ path, definition, ...nested }: FormProps<Field>) {
  return (
    <ul>
      {(nested.get(path) ?? []).map((_: any, index: number) => (
        <li>
          <FormField
            key={index}
            definition={definition}
            path={[...path, index]}
            {...nested}
          />
          <button
            onClick={() =>
              nested.set(
                nested.get(path).filter((_: any, i: number) => i !== index),
                path
              )
            }
          >
            remove
          </button>
        </li>
      ))}
      <li>
        <button
          onClick={() =>
            nested.set(undefined, [...path, nested.get(path)?.length ?? 0])
          }
        >
          Add {definition.name}
        </button>
      </li>
    </ul>
  );
}

function MapField({ path, definition, ...nested }: FormProps<Field>) {
  return (
    <ul>
      {Object.entries(nested.get(path) ?? {}).map(([name, value]) => (
        <li>
          <FormField
            key={name}
            definition={{ ...definition.value, name }}
            path={[...path, name]}
            {...nested}
          />
          <button
            onClick={() => {
              const { [name]: unset, ...rest } = nested.get(path);
              nested.set(rest, path);
            }}
          >
            remove (-)
          </button>
        </li>
      ))}
      <li>
        <TextInput
          placeholder={"Set " + definition.name}
          onSet={(val) => nested.set(undefined, [...path, val])}
        />
      </li>
    </ul>
  );
}

function FormField({ path, definition, ...nested }: FormProps<Field>) {
  const { push } = useStackView();
  return (
    <>
      <div>
        {definition.type === "message" && (
          <button
            onClick={() => {
              push(
                <Form definition={definition.schema!} {...nested} path={path} />
              );
            }}
          >
            Set {definition.name}
          </button>
        )}
        {definition.type === "string" && (
          <input
            type="text"
            placeholder={definition.name}
            value={nested.get(path)}
            onChange={(e) => nested.set(e.target.value, path)}
          />
        )}
        {(definition.type === "float" ||
          definition.type === "int64" ||
          definition.type === "int32") && (
          <input
            type="number"
            placeholder={definition.name}
            value={nested.get(path)}
            onChange={(e) => nested.set(e.target.value, path)}
          />
        )}
      </div>
    </>
  );
}

function TextInput({
  placeholder,
  onSet,
}: {
  placeholder?: string;
  onSet(_: string): void;
}) {
  const [value, setValue] = useState<string>("");
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        onClick={() => {
          onSet(value);
          setValue("");
        }}
      >
        Set
      </button>
    </>
  );
}
