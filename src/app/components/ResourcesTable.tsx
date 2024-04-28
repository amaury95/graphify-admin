import { Element, Field } from "utils/schema";
import { useFetch } from "utils/hooks";
import { useCallback, useMemo, useState } from "react";
import {
  Button,
  Chip,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { DownloadIcon } from "app/assets/icons/Download";
import { camelCaseToNormal, simplifyString } from "../../utils/simplifyString";
import { DownloadLink } from "./DownloadLink";
import { useStackView } from "provider/StackView";
import { ListIcon } from "app/assets/icons/List";
import { QueueIcon } from "app/assets/icons/Queue";
import { DocumentIcon } from "app/assets/icons/Document";
import clsx from "clsx";
import { formatResource } from "../../utils/formatResource";
import { validArray, validObject } from "utils/valid";
import { useClient } from "provider/Service";

const key = {
  name: "key",
  uid: "_key",
};

const from = {
  name: "from",
  uid: "_from",
};

const to = {
  name: "to",
  uid: "_to",
};

export function ResourcesTable({
  resource,
  specs,
}: {
  resource: string;
  specs: Element;
}) {
  const { getResources } = useClient();
  const [count] = useState(10);
  const [offset, setOffset] = useState(0);

  const { data, loading } = useFetch(
    useCallback(
      async () => getResources(resource, count, offset),
      [count, getResources, offset, resource]
    )
  );

  const headers = useMemo(
    () =>
      specs.fields
        .filter((f) => f.type !== "message" && !f.kind)
        .filter((_, index) => index < 5)
        .map((field) => ({
          name: field.name.replace(/^_+/, ""),
          uid: field.name,
        })),
    [specs.fields]
  );

  const pagination = useMemo(
    () =>
      data?.count! > count ? (
        <Pagination
          total={Math.ceil(data?.count! / count)}
          onChange={(e) => setOffset((e - 1) * count)}
        />
      ) : null,
    [count, data?.count]
  );

  return (
    <Table
      shadow="sm"
      isStriped
      classNames={{
        table: clsx({ "min-h-[400px]": loading }),
      }}
      bottomContent={pagination}
    >
      <TableHeader columns={headers}>
        {(column) => (
          <TableColumn key={column.uid} align="start">
            {camelCaseToNormal(column.name)}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={data?.items ?? []}
        isLoading={loading}
        loadingContent={<Spinner color="white" />}
        emptyContent={`No ${resource} found.`}
      >
        {(item: any) => (
          <TableRow key={item._key}>
            {(columnName) => (
              <TableCell>
                <RenderField
                  field={specs.fields.find((f) => f.name === columnName)!}
                  value={item[columnName]}
                  resource={resource}
                />
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function RenderField({
  value,
  field,
  resource,
}: {
  value: any;
  field: Field;
  resource: string;
}) {
  const { push } = useStackView();

  switch (field.name) {
    case key.uid:
      return (
        <Link to={`/${resource}/${value}`} className="underline">
          {value}
        </Link>
      );

    case from.uid:
    case to.uid:
      return (
        <Link to={`/${value}`} className="capitalize underline">
          {formatResource(value ?? "")}
        </Link>
      );
  }

  switch (field.kind) {
    case "list":
      return (
        <>
          {validArray(value) && (
            <Button
              radius="full"
              size="sm"
              variant="flat"
              endContent={<ListIcon />}
              onClick={() =>
                push(
                  <ListTable items={value} field={field} resource={resource} />
                )
              }
            >
              View {camelCaseToNormal(field.name)}
            </Button>
          )}
        </>
      );

    case "map":
      return (
        <>
          {validObject(value) && (
            <Button
              radius="full"
              size="sm"
              variant="flat"
              endContent={<QueueIcon />}
              onClick={() =>
                push(
                  <ObjectTable item={value} field={field} resource={resource} />
                )
              }
            >
              View {camelCaseToNormal(field.name)}
            </Button>
          )}
        </>
      );
  }

  switch (field.type) {
    case "message":
      return (
        <>
          {validObject(value) && (
            <Button
              radius="full"
              size="sm"
              variant="flat"
              endContent={<DocumentIcon />}
              onClick={() =>
                push(
                  <ResourceTable
                    item={value}
                    specs={field.schema!}
                    resource={resource}
                  />
                )
              }
            >
              View {camelCaseToNormal(field.name)}
            </Button>
          )}
        </>
      );

    case "enum":
      return (
        <Chip className="capitalize" variant="flat" color="secondary">
          {simplifyString(field.options![value?.toString()] ?? "none")}
        </Chip>
      );

    case "bool":
      return value ? (
        <Chip variant="flat" color="success">
          Yes
        </Chip>
      ) : (
        <Chip variant="flat" color="danger">
          No
        </Chip>
      );

    case "bytes":
      return (
        <DownloadLink value={value}>
          <Button
            size="sm"
            radius="full"
            variant="flat"
            color="primary"
            endContent={<DownloadIcon />}
          >
            Download {camelCaseToNormal(field.name)}
          </Button>
        </DownloadLink>
      );

    default:
      return <p>{value}</p>;
  }
}

export function ResourceTable({
  item,
  specs,
  loading,
  resource,
}: {
  item: any;
  specs: Element;
  loading?: boolean;
  resource: string;
}) {
  return (
    <>
      <Table
        shadow="sm"
        isStriped
        classNames={{
          table: clsx({ "min-h-[400px]": loading }),
        }}
      >
        <TableHeader>
          <TableColumn>Property</TableColumn>
          <TableColumn>Value</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={loading}
          loadingContent={<Spinner label="Loading..." />}
          items={specs.fields}
        >
          {(field) => (
            <TableRow key={field.name}>
              <TableCell className="uppercase text-xs">
                {camelCaseToNormal(field.name)}
              </TableCell>
              <TableCell>
                <RenderField
                  field={field}
                  value={item[field.name]}
                  resource={resource}
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* OneOfs */}
      {!loading && item && Object.keys(specs.oneofs).length > 0 && (
        <Table shadow="sm" isStriped>
          <TableHeader>
            <TableColumn>Property</TableColumn>
            <TableColumn>Type</TableColumn>
            <TableColumn>Value</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={loading}
            loadingContent={<Spinner label="Loading..." />}
            items={Object.entries(specs.oneofs)}
          >
            {([name, oneof]) => (
              <TableRow key={name}>
                <TableCell className="uppercase text-xs">
                  {camelCaseToNormal(name)}
                </TableCell>
                <TableCell>
                  {Object.keys(item[name] ?? {}).map((key) => (
                    <Chip color="secondary" variant="flat" key={key}>
                      {camelCaseToNormal(key)}
                    </Chip>
                  ))}
                </TableCell>
                <TableCell>
                  {Object.entries(item[name] ?? {}).map(([key, value]) => (
                    <div key={key}>
                      {value !== undefined && (
                        <RenderField
                          field={{ name: key, ...oneof[key] }}
                          resource={resource}
                          value={value}
                        />
                      )}
                    </div>
                  ))}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
}

function ListTable({
  items,
  field,
  resource,
}: {
  items: any;
  field: Field;
  resource: string;
}) {
  const { kind: unset, ..._field } = field; // remove kind to avoid infinite loops
  return (
    <Table shadow="sm" isStriped>
      <TableHeader>
        <TableColumn>No</TableColumn>
        <TableColumn className="capitalize">{field.name}</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {items.map((item: any, index: number) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <RenderField field={_field} value={item} resource={resource} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function ObjectTable({
  item,
  field,
  resource,
}: {
  item: any;
  field: Field;
  resource: string;
}) {
  return (
    <Table shadow="sm" isStriped>
      <TableHeader>
        <TableColumn>Property</TableColumn>
        <TableColumn>Value</TableColumn>
      </TableHeader>
      <TableBody items={Object.entries(item)}>
        {([name, value]) => (
          <TableRow key={name}>
            <TableCell className="uppercase text-xs">
              {camelCaseToNormal(name)}
            </TableCell>
            <TableCell>
              <RenderField
                field={{ name, ...field.value }}
                value={value}
                resource={resource}
              />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
