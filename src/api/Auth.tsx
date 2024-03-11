import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  HashRouter,
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { useFetch, useSubmit } from "../utils";

// const baseUrl = "http://localhost:8080/admin"
const baseUrl = "https://graphify.ovh/admin";

export default function Auth() {
  return (
    <AuthProvider baseURL={baseUrl}>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Account />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

function Layout() {
  const { loggedIn, logout, loading } = useAuth();
  return (
    <>
      {loggedIn ? (
        <button onClick={logout} disabled={loading}>
          Logout
        </button>
      ) : (
        <Link to="/login">Login</Link>
      )}

      <Outlet />
    </>
  );
}

function Login() {
  const [email, setEmail] = useState<string>("admin@graphify.ovh");
  const [password, setPassword] = useState<string>("mysecret");

  const { login, loading, loggedIn } = useAuth();

  if (loggedIn) return <Navigate to="/" />;

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login({ email, password });
        }}
      >
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" disabled={loading} />
      </form>
    </>
  );
}

function Account() {
  const { account, loading, loggedIn } = useAuth();

  if (loading) return <h5>loading account...</h5>;

  if (!loggedIn) return <Navigate to="/login" />;

  return <>{JSON.stringify(account)}</>;
}

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

const useAuth = () => useContext(AuthContext);

function AuthProvider(props: PropsWithChildren<{ baseURL: string }>) {
  const {
    data: account,
    loading: loadingAccount,
    error: errorFetchingAccount,
    doRefetch: refetchAccount,
  } = useFetch(
    useCallback(async () => {
      const resp = await fetch(props.baseURL + "/auth/account", {
        method: "GET",
        credentials: "include",
      });
      return resp.json();
    }, [props.baseURL])
  );

  const { onSubmit: login, loading: loggingIn } = useSubmit<LoginData>(
    useCallback(
      async (data) =>
        await fetch(props.baseURL + "/auth/login", {
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
      [props.baseURL]
    ),
    refetchAccount
  );

  const { onSubmit: logout, loading: loggingOut } = useSubmit(
    useCallback(
      async () =>
        fetch(props.baseURL + "/auth/logout", {
          credentials: "include",
          method: "POST",
        }),
      [props.baseURL]
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
