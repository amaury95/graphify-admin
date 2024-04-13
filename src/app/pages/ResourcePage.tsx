import { useSchema } from "provider/Schema";
import { Navigate, useParams } from "react-router-dom";
import { Element, Field } from "utils/schema";
import { useObject, Nested } from "../../utils/useObject";
import { StackViewProvider, useStackView } from "../../provider/StackView";
import { KeyInput } from "../components/KeyInput";

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
      {Object.entries(definition.oneofs).map(([name, oneof]) => (
        <div>
          <h4>{name}</h4>
          {Object.entries(oneof).map(([option]) => (
            <button
              onClick={() => nested.set({ [option]: null }, [...path, name])}
            >
              {option}
            </button>
          ))}
          {Object.entries(oneof).map(([option, schema]) => (
            <>
              {nested.get([...path, name, option]) !== undefined && (
                <FormField
                  definition={{ ...schema, name: option }}
                  path={[...path, name, option]}
                  {...nested}
                />
              )}
            </>
          ))}
        </div>
      ))}
    </div>
  );
}

function ListField({ path, definition, ...nested }: FormProps<Field>) {
  return (
    <>
      <h4>{definition.name}</h4>
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
    </>
  );
}

function MapField({ path, definition, ...nested }: FormProps<Field>) {
  return (
    <>
      <h4>{definition.name}</h4>
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
          <KeyInput
            placeholder={"Set " + definition.name}
            onSet={(val) => nested.set(undefined, [...path, val])}
          />
        </li>
      </ul>
    </>
  );
}

function FormField({ path, definition, ...nested }: FormProps<Field>) {
  const { push } = useStackView();
  return (
    <>
      <div>
        <h4>{definition.name}</h4>
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
        {definition.type === "enum" && (
          <>
            {Object.entries(definition.options!).map(([value, message]) => (
              <div>
                <label>
                  <input
                    type="radio"
                    value={value}
                    checked={nested.get(path) === value}
                    onChange={(e) => nested.set(e.target.value, path)}
                  />
                  {message}
                </label>
              </div>
            ))}
          </>
        )}
        {definition.type === "string" && (
          <input
            type="text"
            placeholder={definition.name}
            value={nested.get(path)}
            onChange={(e) => nested.set(e.target.value, path)}
          />
        )}
        {definition.type === "bool" && (
          <>
            <label htmlFor={definition.name}>{definition.name}</label>
            <input
              type="checkbox"
              id={definition.name}
              placeholder={definition.name}
              value={nested.get(path)}
              onChange={(e) => nested.set(e.target.checked, path)}
            />
          </>
        )}
        {definition.type === "float" && (
          <input
            type="number"
            placeholder={definition.name}
            value={nested.get(path)}
            onChange={(e) => nested.set(parseFloat(e.target.value), path)}
          />
        )}
        {(definition.type === "int64" || definition.type === "int32") && (
          <input
            type="number"
            placeholder={definition.name}
            value={nested.get(path)}
            onChange={(e) => nested.set(parseInt(e.target.value), path)}
          />
        )}
      </div>
    </>
  );
}
