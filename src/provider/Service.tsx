import { IClient, client } from "api/resources";
import { PropsWithChildren, createContext, useContext } from "react";

const ClientContext = createContext<IClient>(client);

export const useClient = () => useContext(ClientContext);

export function ClientProvider({ children }: PropsWithChildren) {
  return (
    <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
  );
}
