import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

export function Login() {
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
          onChange={(e) => setEmail(e.target.value)} />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" disabled={loading} />
      </form>
    </>
  );
}
