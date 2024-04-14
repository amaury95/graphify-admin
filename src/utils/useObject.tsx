import { useCallback, useState } from "react";

export interface Nested {
  get(path: (string | number)[]): any;
  set(val: any, path: (string | number)[]): void;
}
export function useObject(init: any) {
  const [value, setValue] = useState<any>(init);

  const get = useCallback(
    (path: (string | number)[]) => {
      // Traverse the nested object or array using the path array
      return path.reduce((acc, key) => (acc ? acc[key] : undefined), value);
    },
    [value]
  );

  const set = useCallback((val: any, path: (string | number)[]) => {
    setValue((prevValue: any) => {
      // Create a copy of the previous state to avoid mutations
      const updatedValue = Array.isArray(prevValue)
        ? [...prevValue]
        : { ...prevValue };

      let current = updatedValue;
      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (typeof key === "string") {
          if (Array.isArray(current)) {
            throw new Error(
              `Path ${path.slice(0, i + 1).join(".")} is not an object`
            );
          }
          if (!current[key]) {
            const nextKey = path[i + 1];
            if (typeof nextKey === "string") current[key] = {};
            else if (typeof nextKey === "number") current[key] = [];
          }
          current = current[key];
        } else if (typeof key === "number") {
          if (!Array.isArray(current)) {
            throw new Error(
              `Path ${path.slice(0, i + 1).join(".")} is not an array`
            );
          }
          if (!current[key]) {
            const nextKey = path[i + 1];
            if (typeof nextKey === "string") current[key] = {};
            else if (typeof nextKey === "number") current[key] = [];
          }
          current = current[key];
        }
      }

      // Set the value at the final key in the path
      const finalKey = path[path.length - 1];
      current[finalKey] = val;

      return updatedValue;
    });
  }, []);

  return { value, get, set };
}
