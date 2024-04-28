import { PropsWithChildren, createContext, useContext } from "react";
import { useFetch } from "utils/hooks";
import { Schema } from "utils/schema";
import { useClient } from "./Service";

const SchemaContext = createContext<Schema>({
  edges: {},
  nodes: {},
  relations: {},
});

export const useSchema = () => useContext(SchemaContext);

export function SchemaProvider({ children }: PropsWithChildren) {
  const { getSchema } = useClient();
  const { data, loading } = useFetch(getSchema);

  if (loading || !data) return <div>loading...</div>;

  return (
    <SchemaContext.Provider value={data}>{children}</SchemaContext.Provider>
  );
}
