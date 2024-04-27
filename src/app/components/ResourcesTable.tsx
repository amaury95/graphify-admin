import { Element, Field } from "utils/schema";
import { useFetch } from "utils/hooks";
import { useCallback, useMemo, useState } from "react";
import { baseUrl } from "api/baseUrl";
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

const actions = {
  name: "actions",
  uid: "actions",
};

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
  const [count] = useState(10);
  const [offset, setOffset] = useState<number>();
  const resourceUrl = useMemo(() => {
    let url = `${baseUrl}/${resource}?count=${count}`;
    return offset ? `${url}&offset=${offset}` : url;
  }, [count, offset, resource]);

  const { data, loading } = useFetch(
    useCallback(async () => {
      const resp = await fetch(resourceUrl, {
        credentials: "include",
        method: "GET",
      });
      const { items, count } = await resp.json();

      return { items, count };
    }, [resourceUrl])
  );

  const headers = useMemo(
    () =>
      Object.values(specs.fields)
        .filter((f) => f.type !== "message" && !f.kind)
        .filter((_, index) => index < 5)
        .map((field) => ({
          name: field.name.replace(/^_+/, ""),
          uid: field.name,
          field,
        })),
    [specs.fields]
  );

  const pagination = useMemo(
    () =>
      data?.count > count ? (
        <Pagination
          total={Math.ceil(data?.count / count)}
          onChange={(e) => setOffset((e - 1) * count)}
        />
      ) : null,
    [count, data?.count]
  );

  return (
    <Table shadow="sm" bottomContent={pagination} isStriped>
      <TableHeader columns={headers}>
        {(column) =>
          column.uid === actions.uid ? (
            <TableColumn key={column.uid} align="center" className="capitalize">
              <div className="flex justify-center">{column.name}</div>
            </TableColumn>
          ) : (
            <TableColumn key={column.uid} align="start" className="capitalize">
              {column.name}
            </TableColumn>
          )
        }
      </TableHeader>
      <TableBody
        items={data?.items ?? []}
        isLoading={loading}
        loadingContent={<Spinner color="white" />}
        emptyContent={`No ${resource} found.`}
      >
        {(item: any) => (
          <TableRow key={item._key}>
            {(columnName) =>
              columnName === key.uid ? (
                <TableCell className="capitalize underline hover:text-primary">
                  <Link to={`/${resource}/${item[key.uid]}`}>
                    <p>{item[columnName]}</p>
                  </Link>
                </TableCell>
              ) : columnName === from.uid || columnName === to.uid ? (
                <TableCell className="capitalize underline hover:text-primary">
                  <Link to={`/${item[columnName]}`}>
                    {formatResource(item[columnName])}
                  </Link>
                </TableCell>
              ) : (
                <TableCell>
                  <RenderField
                    field={specs.fields[columnName]}
                    value={item[columnName]}
                  />
                </TableCell>
              )
            }
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function RenderField({ value, field }: { value: any; field: Field }) {
  switch (field.type) {
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
        <Link to={`${baseUrl}/files/download/${value}`}>
          <Button
            size="sm"
            radius="full"
            variant="light"
            color="primary"
            endContent={<DownloadIcon />}
          >
            Download
          </Button>
        </Link>
      );

    default:
      return <p>{value}</p>;
  }
}
function simplifyString(input: string): string {
  const index = input.indexOf("_");
  if (index !== -1) {
    return input.substring(index + 1).toLowerCase();
  } else {
    return input.toLowerCase();
  }
}

function formatResource(id: string) {
  const [resource, key] = id.split("/");
  return `${resource} ${key}`;
}
