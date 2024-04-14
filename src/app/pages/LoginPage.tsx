import React, { useState } from "react";
import { useAuth } from "provider/Auth";

export function LoginPage() {
  const [email, setEmail] = useState<string>("admin@graphify.ovh");
  const [password, setPassword] = useState<string>("mysecret");

  const { login, loading } = useAuth();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login({ email, password });
        }}
      >
        <div>
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            type="text"
            title="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            title="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input type="submit" disabled={loading} />
        </div>
      </form>
    </>
  );
}
