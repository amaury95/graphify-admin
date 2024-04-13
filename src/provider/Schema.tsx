import { baseUrl } from "api/baseUrl";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
} from "react";
import { useFetch } from "utils/hooks";
import { Schema } from "utils/schema";

const SchemaContext = createContext<Schema>({
  edges: {},
  nodes: {},
  relations: {},
});

export const useSchema = () => useContext(SchemaContext);

export function SchemaProvider({ children }: PropsWithChildren) {
  const { data, loading } = useFetch(
    useCallback(async (): Promise<Schema> => {
      const resp = await fetch(baseUrl + "/schema", {
        method: "GET",
        credentials: "include",
      });
      return resp.json();
    }, [])
  );

  if (loading || !data) return <div>loading...</div>;

  return (
    <SchemaContext.Provider value={data}>{children}</SchemaContext.Provider>
  );
}
