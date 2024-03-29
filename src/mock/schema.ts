export const schema = {
  nodes: {
    admin_accounts: {
      fields: {
        _key: { type: "string", name: "_key" },
        firstName: { type: "string", name: "firstName" },
        lastName: { type: "string", name: "lastName" },
        email: { type: "string", name: "email" },
        avatar: { optional: true, type: "bytes", name: "avatar" },
        notes: { optional: true, type: "string", name: "notes" },
      },
      oneofs: {},
    },
    books: {
      fields: {
        _key: { type: "string", name: "_key" },
        title: { type: "string", name: "title" },
        author: { type: "string", name: "author" },
        mainReview: {
          optional: true,
          value: {
            fields: {
              message: { type: "string", name: "message" },
              name: { type: "string", name: "name" },
            },
            oneofs: {},
          },
          type: "message",
          name: "mainReview",
        },
        reviews: {
          kind: "list",
          value: {
            fields: {
              message: { type: "string", name: "message" },
              name: { type: "string", name: "name" },
            },
            oneofs: {},
          },
          type: "message",
          name: "reviews",
        },
        tags: { kind: "list", type: "string", name: "tags" },
        bookPrice: {
          kind: "map",
          key: { type: "string" },
          value: { type: "int32" },
          name: "bookPrice",
        },
        chapters: {
          kind: "map",
          key: { type: "int32" },
          value: { type: "string" },
          name: "chapters",
        },
        characters: {
          kind: "map",
          key: { type: "string" },
          value: {
            value: {
              fields: {
                name: { type: "string", name: "name" },
                role: { type: "string", name: "role" },
              },
              oneofs: {},
            },
            type: "message",
          },
          name: "characters",
        },
        portrait: { type: "bytes", name: "portrait" },
        gallery: { kind: "list", type: "bytes", name: "gallery" },
        category: {
          options: {
            "0": "CATEGORY_UNSPECIFIED",
            "1": "CATEGORY_DRAMA",
            "2": "CATEGORY_HORROR",
          },
          type: "enum",
          name: "category",
        },
      },
      oneofs: {
        Type: {
          novel: {
            fields: {
              genre: { type: "string", name: "genre" },
              publicationYear: { type: "int32", name: "publicationYear" },
            },
            oneofs: {},
          },
          shortStory: {
            fields: {
              lengthPages: { type: "int32", name: "lengthPages" },
              isCollection: { type: "bool", name: "isCollection" },
            },
            oneofs: {},
          },
          academic: {
            fields: {
              subject: { type: "string", name: "subject" },
              edition: { type: "int32", name: "edition" },
            },
            oneofs: {},
          },
          poetry: {
            fields: {
              style: { type: "string", name: "style" },
              isAnthology: { type: "bool", name: "isAnthology" },
            },
            oneofs: {},
          },
          biography: {
            fields: {
              subjectPerson: { type: "string", name: "subjectPerson" },
              notableAchievements: {
                type: "string",
                name: "notableAchievements",
              },
            },
            oneofs: {},
          },
        },
      },
    },
    clients: {
      fields: {
        _key: { type: "string", name: "_key" },
        name: { type: "string", name: "name" },
        email: { type: "string", name: "email" },
        member: { type: "bool", name: "member" },
      },
      oneofs: {},
    },
  },
  edges: {
    borrows: {
      fields: {
        _key: { type: "string", name: "_key" },
        _from: { type: "string", name: "_from" },
        _to: { type: "string", name: "_to" },
        date: { optional: true, type: "int64", name: "date" },
      },
      oneofs: {},
    },
  },
  relations: { clients: { books: "borrows" } },
};
