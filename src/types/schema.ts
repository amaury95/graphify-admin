export interface Schema {
  nodes: { [collection: string]: Element };
  edges: { [collection: string]: Element };
  relations: { [inbound: string]: { [outbound: string]: string } };
}

export interface Element {
  fields: { [field: string]: Field };
  oneofs: { [field: string]: { [option: string]: Element } };
}

export interface Field {
  name: string;
  type?: FieldType;
  kind?: FieldKind;
  key?: Key;
  value?: Element | Field;
  options?: { [key: string]: string };
  optional?: boolean;
}

export type FieldKind = "map" | "list" | undefined;
export type FieldType =
  | "string"
  | "bytes"
  | "int32"
  | "message"
  | "enum"
  | "bool"
  | undefined;

export interface Key {
  type: "string" | "int32";
}
