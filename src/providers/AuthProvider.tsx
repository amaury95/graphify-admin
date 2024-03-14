import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import { LoginData, useApiAccount, useApiLogin, useApiLogout } from "hooks/api";

type Admin = {
  _key: string;
  email: string;
  firstName: string;
  lastName: string;
};

interface IAuthContext {
  login(data?: LoginData): void;
  logout(): void;
  account?: Admin;
  loading?: boolean;
  loggedIn?: boolean;
}
const AuthContext = createContext<IAuthContext>({
  login: function () {
    console.log("undefined login");
  },
  logout: function () {
    console.log("undefined logout");
  },
});
export const useAuth = () => useContext(AuthContext);
export function AuthProvider(props: PropsWithChildren) {
  const {
    data: account,
    loading: loadingAccount,
    error: errorFetchingAccount,
    doRefetch,
  } = useApiAccount();

  const { onSubmit: login, loading: loggingIn } = useApiLogin(doRefetch);
  const { onSubmit: logout, loading: loggingOut } = useApiLogout(doRefetch);

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
