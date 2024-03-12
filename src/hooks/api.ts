import { useCallback } from "react";
import { useFetch } from "utils/hooks";

const baseURL = "https://graphify.ovh/admin";

export const useSchema = () =>
  useFetch(
    useCallback(async () => {
      const resp = await fetch(baseURL + "/schema", {
        method: "GET",
        credentials: "include",
      });
      return resp.json();
    }, [])
  );
