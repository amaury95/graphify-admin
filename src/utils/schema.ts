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
  fields: { [name: string]: Field };
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
      fields: {
        _from: { name: "_from", type: "string" },
        _key: { name: "_key", type: "string" },
        _to: { name: "_to", type: "string" },
        date: { name: "date", optional: true, type: "int64" },
      },
      name: "Borrow",
      oneofs: {},
    },
  },
  nodes: {
    books: {
      fields: {
        _key: { name: "_key", type: "string" },
        author: { name: "author", type: "string" },
        bookPrice: {
          key: { type: "string" },
          kind: "map",
          name: "bookPrice",
          value: { type: "int32" },
        },
        category: {
          name: "category",
          options: {
            "0": "CATEGORY_UNSPECIFIED",
            "1": "CATEGORY_DRAMA",
            "2": "CATEGORY_HORROR",
          },
          type: "enum",
        },
        chapters: {
          key: { type: "int32" },
          kind: "map",
          name: "chapters",
          value: { type: "string" },
        },
        characters: {
          key: { type: "string" },
          kind: "map",
          name: "characters",
          value: {
            schema: {
              fields: {
                name: { name: "name", type: "string" },
                role: { name: "role", type: "string" },
              },
              name: "Character",
              oneofs: {},
            },
            type: "message",
          },
        },
        gallery: { kind: "list", name: "gallery", type: "bytes" },
        mainReview: {
          name: "mainReview",
          optional: true,
          schema: {
            fields: {
              message: { name: "message", type: "string" },
              name: { name: "name", type: "string" },
            },
            name: "Book_Review",
            oneofs: {},
          },
          type: "message",
        },
        portrait: { name: "portrait", type: "bytes" },
        reviews: {
          kind: "list",
          name: "reviews",
          schema: {
            fields: {
              message: { name: "message", type: "string" },
              name: { name: "name", type: "string" },
            },
            name: "Book_Review",
            oneofs: {},
          },
          type: "message",
        },
        tags: { kind: "list", name: "tags", type: "string" },
        title: { name: "title", type: "string" },
      },
      name: "Book",
      oneofs: {
        Role: {
          Admin: { type: "bool" },
          Client: { type: "bool" },
          Manager: { type: "bool" },
          Other: { type: "string" },
        },
        Type: {
          Academic: {
            schema: {
              fields: {
                edition: { name: "edition", type: "int32" },
                subject: { name: "subject", type: "string" },
              },
              name: "Book_Academic",
              oneofs: {},
            },
            type: "message",
          },
          Biography: {
            schema: {
              fields: {
                notableAchievements: {
                  name: "notableAchievements",
                  type: "string",
                },
                subjectPerson: { name: "subjectPerson", type: "string" },
              },
              name: "Book_Biography",
              oneofs: {},
            },
            type: "message",
          },
          Novel: {
            schema: {
              fields: {
                genre: { name: "genre", type: "string" },
                publicationYear: { name: "publicationYear", type: "int32" },
              },
              name: "Book_Novel",
              oneofs: {},
            },
            type: "message",
          },
          Poetry: {
            schema: {
              fields: {
                isAnthology: { name: "isAnthology", type: "bool" },
                style: { name: "style", type: "string" },
              },
              name: "Book_Poetry",
              oneofs: {},
            },
            type: "message",
          },
          ShortStory: {
            schema: {
              fields: {
                isCollection: { name: "isCollection", type: "bool" },
                lengthPages: { name: "lengthPages", type: "int32" },
              },
              name: "Book_ShortStory",
              oneofs: {},
            },
            type: "message",
          },
        },
      },
    },
    clients: {
      fields: {
        _key: { name: "_key", type: "string" },
        email: { name: "email", type: "string" },
        member: { name: "member", type: "bool" },
        name: { name: "name", type: "string" },
      },
      name: "Client",
      oneofs: {},
    },
    libraries: {
      fields: {
        _key: { name: "_key", type: "string" },
        location: {
          name: "location",
          optional: true,
          schema: {
            fields: {
              lat: { name: "lat", type: "float" },
              lng: { name: "lng", type: "float" },
            },
            name: "Library_Location",
            oneofs: {},
          },
          type: "message",
        },
        name: { name: "name", type: "string" },
      },
      name: "Library",
      oneofs: {},
    },
  },
  relations: { borrows: { _from: "clients", _to: "books" } },
};
