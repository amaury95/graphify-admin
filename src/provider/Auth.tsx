import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { useFetch, useSubmit } from "../utils/hooks";
import { baseUrl } from "api/baseUrl";

// CONTEXT
type Admin = {
  _key: string;
  email: string;
  firstName: string;
  lastName: string;
};

type LoginData = { email: string; password: string };

interface IAuthContext {
  login(data?: LoginData): void;
  logout(): void;
  account?: Admin;
  loading?: boolean;
  loggedIn?: boolean;
}

const AuthContext = createContext<IAuthContext>({
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider(props: PropsWithChildren) {
  const {
    data: account,
    loading: loadingAccount,
    error: errorFetchingAccount,
    doRefetch: refetchAccount,
  } = useFetch(
    useCallback(async () => {
      const resp = await fetch(baseUrl + "/auth/account", {
        method: "GET",
        credentials: "include",
      });
      return resp.json();
    }, [])
  );

  const { onSubmit: login, loading: loggingIn } = useSubmit<LoginData>(
    useCallback(
      async (data) =>
        await fetch(baseUrl + "/auth/login", {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data?.email,
            password: data?.password,
          }),
        }),
      []
    ),
    refetchAccount
  );

  const { onSubmit: logout, loading: loggingOut } = useSubmit(
    useCallback(
      async () =>
        fetch(baseUrl + "/auth/logout", {
          credentials: "include",
          method: "POST",
        }),
      []
    ),
    refetchAccount
  );

  const loading = useMemo(
    () => loadingAccount || loggingIn || loggingOut,
    [loadingAccount, loggingIn, loggingOut]
  );

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        loading,
        account,
        loggedIn: !errorFetchingAccount,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
