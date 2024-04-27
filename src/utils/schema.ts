// export interface Schema {
//   nodes: { [name: string]: Element };
//   edges: { [name: string]: Element };
//   relations: { [edge: string]: { _from: string; _to: string } };
// }

// export interface Element extends Object {
//   name: string;
//   fields: { [name: string]: Field };
//   oneofs: { [name: string]: Oneof };
// }

// export type Field = (List | Map | Enum | Value) & {
//   name: string;
//   optional?: boolean;
// };

// export type List = Value & { kind: "list" };

// export type Map = { kind: "map"; key: Value; value: Value };

// interface Enum {
//   type: "enum";
//   options: { [value: string]: string };
// }

// export type Value = Bool | String | Bytes | Float | Int64 | Int32 | Message;
// export type Bool = { type: "bool" };
// export type String = { type: "string" };
// export type Bytes = { type: "bytes" };
// export type Float = { type: "float" };
// export type Int64 = { type: "int64" };
// export type Int32 = { type: "int32" };
// export type Message = { type: "message"; schema: Element };

// export type Oneof = { [option: string]: Value };

export interface Schema {
  nodes: { [name: string]: Element };
  edges: { [name: string]: Element };
  relations: { [edge: string]: { _from: string; _to: string } };
}

export interface Element extends Object {
  name: string;
  fields: Field[];
  oneofs: { [name: string]: Oneof };
}

export interface Field extends Value {
  name: string;
  optional?: boolean;
  kind?: "list" | "map";
  key?: Value;
  value?: Value;
}

export interface Value {
  type?:
    | "bool"
    | "string"
    | "bytes"
    | "float"
    | "int64"
    | "int32"
    | "message"
    | "enum";
  schema?: Element;
  options?: { [value: string]: string };
}

export interface Oneof {
  [option: string]: Value;
}

export const test: Schema = {
  edges: {
    borrows: {
      fields: [
        {
          name: "_key",
          type: "string",
        },
        {
          name: "_from",
          type: "string",
        },
        {
          name: "_to",
          type: "string",
        },
        {
          name: "date",
          optional: true,
          type: "int64",
        },
      ],
      name: "Borrow",
      oneofs: {},
    },
  },
  nodes: {
    books: {
      fields: [
        {
          name: "_key",
          type: "string",
        },
        {
          name: "title",
          type: "string",
        },
        {
          name: "author",
          type: "string",
        },
        {
          name: "mainReview",
          optional: true,
          schema: {
            fields: [
              {
                name: "message",
                type: "string",
              },
              {
                name: "name",
                type: "string",
              },
            ],
            name: "Book_Review",
            oneofs: {},
          },
          type: "message",
        },
        {
          kind: "list",
          name: "reviews",
          schema: {
            fields: [
              {
                name: "message",
                type: "string",
              },
              {
                name: "name",
                type: "string",
              },
            ],
            name: "Book_Review",
            oneofs: {},
          },
          type: "message",
        },
        {
          kind: "list",
          name: "tags",
          type: "string",
        },
        {
          key: {
            type: "string",
          },
          kind: "map",
          name: "bookPrice",
          value: {
            type: "int32",
          },
        },
        {
          key: {
            type: "int32",
          },
          kind: "map",
          name: "chapters",
          value: {
            type: "string",
          },
        },
        {
          key: {
            type: "string",
          },
          kind: "map",
          name: "characters",
          value: {
            schema: {
              fields: [
                {
                  name: "name",
                  type: "string",
                },
                {
                  name: "role",
                  type: "string",
                },
              ],
              name: "Character",
              oneofs: {},
            },
            type: "message",
          },
        },
        {
          name: "portrait",
          type: "bytes",
        },
        {
          kind: "list",
          name: "gallery",
          type: "bytes",
        },
        {
          name: "category",
          options: {
            "0": "CATEGORY_UNSPECIFIED",
            "1": "CATEGORY_DRAMA",
            "2": "CATEGORY_HORROR",
          },
          type: "enum",
        },
      ],
      name: "Book",
      oneofs: {
        Role: {
          Admin: {
            type: "bool",
          },
          Client: {
            type: "bool",
          },
          Manager: {
            type: "bool",
          },
          Other: {
            type: "string",
          },
        },
        Type: {
          Academic: {
            schema: {
              fields: [
                {
                  name: "subject",
                  type: "string",
                },
                {
                  name: "edition",
                  type: "int32",
                },
              ],
              name: "Book_Academic",
              oneofs: {},
            },
            type: "message",
          },
          Biography: {
            schema: {
              fields: [
                {
                  name: "subjectPerson",
                  type: "string",
                },
                {
                  name: "notableAchievements",
                  type: "string",
                },
              ],
              name: "Book_Biography",
              oneofs: {},
            },
            type: "message",
          },
          Novel: {
            schema: {
              fields: [
                {
                  name: "genre",
                  type: "string",
                },
                {
                  name: "publicationYear",
                  type: "int32",
                },
              ],
              name: "Book_Novel",
              oneofs: {},
            },
            type: "message",
          },
          Poetry: {
            schema: {
              fields: [
                {
                  name: "style",
                  type: "string",
                },
                {
                  name: "isAnthology",
                  type: "bool",
                },
              ],
              name: "Book_Poetry",
              oneofs: {},
            },
            type: "message",
          },
          ShortStory: {
            schema: {
              fields: [
                {
                  name: "lengthPages",
                  type: "int32",
                },
                {
                  name: "isCollection",
                  type: "bool",
                },
              ],
              name: "Book_ShortStory",
              oneofs: {},
            },
            type: "message",
          },
        },
      },
    },
    clients: {
      fields: [
        {
          name: "_key",
          type: "string",
        },
        {
          name: "name",
          type: "string",
        },
        {
          name: "email",
          type: "string",
        },
        {
          name: "member",
          type: "bool",
        },
      ],
      name: "Client",
      oneofs: {},
    },
    libraries: {
      fields: [
        {
          name: "_key",
          type: "string",
        },
        {
          name: "name",
          type: "string",
        },
        {
          name: "location",
          optional: true,
          schema: {
            fields: [
              {
                name: "lat",
                type: "float",
              },
              {
                name: "lng",
                type: "float",
              },
            ],
            name: "Library_Location",
            oneofs: {},
          },
          type: "message",
        },
      ],
      name: "Library",
      oneofs: {},
    },
  },
  relations: {
    borrows: {
      _from: "clients",
      _to: "books",
    },
  },
};
