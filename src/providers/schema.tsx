import { useSchema as useFetchSchema } from "hooks/api";
import { PropsWithChildren, createContext, useContext } from "react";
import { Schema } from "types/schema";

type SchemaContextType = {
  schema: Schema;
};

const SchemaContext = createContext<SchemaContextType>({
  schema: { edges: {}, nodes: {}, relations: {} },
});

export const useSchema = () => useContext(SchemaContext);

export default function SchemaProvider({ children }: PropsWithChildren) {
  const { data, loading } = useFetchSchema();
  if (loading) return <div>loading...</div>;
  return (
    <SchemaContext.Provider value={{ schema: data }}>
      {children}
    </SchemaContext.Provider>
  );
}
