import { useCallback } from "react";
import { useFetch, useSubmit } from "utils/hooks";
import { Schema } from "utils/schema";
import { baseUrl } from "./baseUrl";
export const useFetchSchema = () =>
  useFetch(
    useCallback(async (): Promise<Schema> => {
      const resp = await fetch(baseUrl + "/schema", {
        method: "GET",
        credentials: "include",
      });
      return resp.json();
    }, [])
  );
export const useFetchResources = (resource: string, keys?: string[]) =>
  useFetch(
    useCallback(async () => {
      const resp = await fetch(baseUrl + "/" + resource + queryKeys(keys), {
        method: "GET",
        credentials: "include",
      });
      return resp.json();
    }, [keys, resource])
  );
export const useFetchResource = (resource: string, key: string) =>
  useFetch(
    useCallback(async () => {
      const resp = await fetch(baseUrl + "/" + resource + "/" + key, {
        method: "GET",
        credentials: "include",
      });
      return resp.json();
    }, [resource, key])
  );
export const useCreateResource = (
  resource: string,
  value: any,
  onFinish?: (key: string) => void
) =>
  useSubmit(
    useCallback(async () => {
      const resp = await fetch(baseUrl + "/" + resource, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(value),
      });
      const [key] = await resp.json();
      if (!!onFinish) onFinish(key);
    }, [onFinish, resource, value])
  );
export const useUpdateResource = () =>
  useFetch(useCallback(async () => {}, []));
export const useDeleteResource = () =>
  useFetch(useCallback(async () => {}, []));

function queryKeys(keys?: string[]) {
  if (keys && keys.length > 0)
    return `?` + keys.map((key) => `keys=${key}`).join("&");
  return "";
}
