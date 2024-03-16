import { useCallback } from "react";
import { Function, useFetch, useSubmit } from "utils/hooks";

export const baseURL = "https://graphify.ovh/admin";

export const useApiAccount = () =>
  useFetch(
    useCallback(async () => {
      const resp = await fetch(baseURL + "/auth/account", {
        method: "GET",
        credentials: "include",
      });
      return resp.json();
    }, [])
  );

export type LoginData = { email: string; password: string };
export const useApiLogin = (onFinish: Function) =>
  useSubmit<LoginData>(
    useCallback(
      async (data) =>
        await fetch(baseURL + "/auth/login", {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }),
      []
    ),
    onFinish
  );

export const useApiLogout = (onFinish: Function) =>
  useSubmit(
    useCallback(
      async () =>
        fetch(baseURL + "/auth/logout", {
          credentials: "include",
          method: "POST",
        }),
      []
    ),
    onFinish
  );

export const useApiSchema = () =>
  useFetch(
    useCallback(async () => {
      const resp = await fetch(baseURL + "/schema", {
        method: "GET",
        credentials: "include",
      });
      return resp.json();
    }, [])
  );
