import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "provider/Auth";
import { LoginPage } from "app/pages/LoginPage";

export function Authorized() {
  const { loggedIn, loading } = useAuth();
  if (loading) return <h3>loading...</h3>;
  if (loggedIn) return <Outlet />;
  return <LoginPage />;
}
