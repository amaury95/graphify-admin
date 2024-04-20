import { useFetchSchema } from "api/resources";
import { PropsWithChildren, createContext, useContext } from "react";
import { Schema } from "utils/schema";

const SchemaContext = createContext<Schema>({
  edges: {},
  nodes: {},
  relations: {},
});

export const useSchema = () => useContext(SchemaContext);

export function SchemaProvider({ children }: PropsWithChildren) {
  const { data, loading } = useFetchSchema();

  if (loading || !data) return <div>loading...</div>;

  return (
    <SchemaContext.Provider value={data}>{children}</SchemaContext.Provider>
  );
}
