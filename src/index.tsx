import React from "react";
import ReactDOM from "react-dom/client";
import "index.css";
import reportWebVitals from "reportWebVitals";
import { HashRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "provider/Auth";
import { baseUrl } from "api/baseUrl";
import { Layout } from "app/layouts/Layout";
import { Authorized } from "app/layouts/Authorized";
import { ResourcePage } from "app/pages/ResourcePage";
import { HomePage } from "app/pages/HomePage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider baseURL={baseUrl}>
      <Router />
    </AuthProvider>
  </React.StrictMode>
);

function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Authorized />}>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path=":resource" element={<ResourcePage />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
