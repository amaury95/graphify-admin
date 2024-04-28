import { Element, Field } from "utils/schema";
import { Nested } from "utils/useObject";
import { StackViewProvider, useStackView } from "provider/StackView";
import { useSubmit } from "utils/hooks";
import { ChangeEvent, useCallback, useState } from "react";
import { baseUrl } from "api/baseUrl";
import { Button, Checkbox, Input, Radio, RadioGroup } from "@nextui-org/react";
import { camelCaseToNormal, simplifyString } from "utils/simplifyString";
import { TrashIcon } from "app/assets/icons/Trash";
import { DownloadIcon } from "app/assets/icons/Download";
import { UploadIcon } from "app/assets/icons/Upload";
import { DownloadLink } from "./DownloadLink";
import { validObject } from "utils/valid";

export function ResourceForm({
  object,
  specs,
}: {
  object: Nested;
  specs: Element;
}) {
  return (
    <StackViewProvider
      position="bottom"
      back={(back) => (
        <Button className="mt-6" onClick={() => back()}>
          Continue
        </Button>
      )}
    >
      <Form definition={specs} {...object} path={[]} />
    </StackViewProvider>
  );
}
interface FormProps<T> extends Nested {
  path: (string | number)[]; // Path to set the current value
  definition: T; // Schema definition for the element
}
function Form({ path, definition, ...nested }: FormProps<Element>) {
  return (
    <div className="flex flex-col gap-4">
      {definition.fields
        .filter(({ name }) => !["_key", "_from", "_to"].includes(name))
        .map((field) => (
          <>
            {field.kind === "list" ? (
              <ListField
                key={field.name}
                definition={field}
                path={[...path, field.name]}
                {...nested}
              />
            ) : field.kind === "map" ? (
              <MapField
                key={field.name}
                definition={field}
                path={[...path, field.name]}
                {...nested}
              />
            ) : (
              <FormField
                key={field.name}
                definition={field}
                path={[...path, field.name]}
                {...nested}
              />
            )}
          </>
        ))}
      {Object.entries(definition.oneofs).map(([name, oneof]) => (
        <div className="form-wrapper">
          <h4 className="text-medium">{name}</h4>

          <div className="flex gap-2 my-4">
            {Object.entries(oneof).map(([option]) => (
              <Button
                size="sm"
                variant="flat"
                color={
                  nested.get([...path, name, option]) !== undefined
                    ? "primary"
                    : "default"
                }
                onClick={() => nested.set({ [option]: null }, [...path, name])}
              >
                {option}
              </Button>
            ))}
          </div>

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
    <div className="form-wrapper">
      <h4 className="text-medium capitalize mb-4">{definition.name}</h4>
      <ul className="flex flex-col gap-2">
        {(nested.get(path) ?? []).map((_: any, index: number) => (
          <li className="flex items-center gap-2">
            <div className="grow">
              <FormField
                key={index}
                definition={definition}
                path={[...path, index]}
                {...nested}
              />
            </div>
            <DeleteButton
              onClick={() =>
                nested.set(
                  nested.get(path).filter((_: any, i: number) => i !== index),
                  path
                )
              }
            />
          </li>
        ))}
        <li>
          <Button
            fullWidth
            variant="light"
            onClick={() =>
              nested.set(undefined, [...path, nested.get(path)?.length ?? 0])
            }
          >
            Add {definition.name}
          </Button>
        </li>
      </ul>
    </div>
  );
}
function MapField({ path, definition, ...nested }: FormProps<Field>) {
  return (
    <div className="form-wrapper">
      <h4 className="text-medium mb-4">{camelCaseToNormal(definition.name)}</h4>
      <ul className="flex flex-col gap-2">
        {Object.entries(nested.get(path) ?? {}).map(([name, value]) => (
          <li className="flex items-center gap-2">
            <div className="grow">
              <FormField
                key={name}
                definition={{ ...definition.value, name }}
                path={[...path, name]}
                {...nested}
              />
            </div>
            <DeleteButton
              onClick={() => {
                const { [name]: unset, ...rest } = nested.get(path);
                nested.set(rest, path);
              }}
            />
          </li>
        ))}
        <li>
          <KeyInput
            placeholder={"New " + camelCaseToNormal(definition.name)}
            onSet={(val) => nested.set(undefined, [...path, val])}
          />
        </li>
      </ul>
    </div>
  );
}
function FormField({ path, definition, ...nested }: FormProps<Field>) {
  const { push, pop } = useStackView();
  return (
    <>
      <div>
        {definition.type === "message" && (
          <Button
            fullWidth
            variant="flat"
            onClick={() => {
              push(
                <Form definition={definition.schema!} {...nested} path={path} />
              );
            }}
          >
            {validObject(nested.get(path)) ? "Edit" : "Set"}{" "}
            {camelCaseToNormal(definition.name)}
          </Button>
        )}
        {definition.type === "enum" && (
          <div className="form-wrapper">
            <RadioGroup
              label={`Select ${camelCaseToNormal(definition.name)}`}
              value={nested.get(path)?.toString()}
              onValueChange={(e) => nested.set(parseInt(e), path)}
            >
              {Object.entries(definition.options!).map(([value, message]) => (
                <Radio value={value} key={value} className="capitalize">
                  {simplifyString(message)}
                </Radio>
              ))}
            </RadioGroup>
          </div>
        )}
        {definition.type === "string" && (
          <Input
            type="text"
            placeholder={camelCaseToNormal(definition.name)}
            value={nested.get(path)}
            onChange={(e) => nested.set(e.target.value, path)}
          />
        )}
        {definition.type === "bytes" && (
          <div className="flex items-center gap-2">
            <Button
              fullWidth
              variant="flat"
              endContent={<UploadIcon />}
              onClick={() =>
                push(
                  <ImageUpload
                    name={definition.name}
                    onUpload={(url) => {
                      nested.set(url, path);
                      pop();
                    }}
                  />
                )
              }
            >
              Upload {camelCaseToNormal(definition.name)}
            </Button>

            <DownloadLink value={nested.get(path)}>
              <Button
                isIconOnly
                color="primary"
                variant="light"
                radius="full"
                size="sm"
              >
                <DownloadIcon />
              </Button>
            </DownloadLink>
          </div>
        )}
        {definition.type === "bool" && (
          <div className="form-wrapper">
            <Checkbox
              isSelected={nested.get(path)}
              onValueChange={(e) => nested.set(e, path)}
            >
              {camelCaseToNormal(definition.name)}
            </Checkbox>
          </div>
        )}
        {definition.type === "float" && (
          <Input
            type="number"
            placeholder={camelCaseToNormal(definition.name)}
            value={nested.get(path)}
            onChange={(e) => nested.set(parseFloat(e.target.value), path)}
          />
        )}
        {(definition.type === "int64" || definition.type === "int32") && (
          <Input
            type="number"
            placeholder={camelCaseToNormal(definition.name)}
            value={nested.get(path)}
            onChange={(e) => nested.set(parseInt(e.target.value), path)}
          />
        )}
      </div>
    </>
  );
}

function ImageUpload({
  name,
  onUpload,
}: {
  name: string;
  onUpload(url: string): void;
}) {
  const [file, setFile] = useState<File>();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };
  const { onSubmit, loading } = useSubmit(
    useCallback(async () => {
      const formData = new FormData();
      formData.append("file", file!);

      const resp = await fetch(baseUrl + "/files/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const [hash] = await resp.json();
      onUpload(hash);
    }, [file, onUpload])
  );
  return (
    <div className="form-wrapper flex items-center gap-2">
      <input
        placeholder={name}
        type="file"
        name={name}
        onChange={handleFileChange}
        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
      />
      <Button
        isDisabled={!file}
        onClick={onSubmit}
        isLoading={loading}
        variant="flat"
      >
        Upload
      </Button>
    </div>
  );
}

function DeleteButton({ onClick }: { onClick: Function }) {
  return (
    <Button
      isIconOnly
      color="danger"
      variant="light"
      size="sm"
      radius="full"
      onClick={() => onClick()}
    >
      <TrashIcon />
    </Button>
  );
}

function KeyInput({
  placeholder,
  onSet,
}: {
  placeholder?: string;
  onSet(_: string): void;
}) {
  const [value, setValue] = useState<string>("");
  return (
    <div className="flex items-center gap-2">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        onClick={() => {
          onSet(value);
          setValue("");
        }}
      >
        Add
      </Button>
    </div>
  );
}
