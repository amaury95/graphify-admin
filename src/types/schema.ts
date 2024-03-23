export interface Schema {
  nodes: { [collection: string]: Element };
  edges: { [collection: string]: Element };
  relations: { [inbound: string]: { [outbound: string]: string } };
}

export interface Element {
  fields: { [field: string]: Field };
  oneofs: { [field: string]: { [option: string]: Element } };
}

export interface Value {
  optional?: boolean;
  type: Type;
  // type = message
  schema?: Element;
  // type = enum
  options?: { [key: string]: string };
}

export interface Field extends Value {
  name: string | any[];
  kind?: Kind;

  // kind = map
  key?: Key;
  value?: Value;
}

export type Kind = "map" | "list" | undefined;
export type Type =
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