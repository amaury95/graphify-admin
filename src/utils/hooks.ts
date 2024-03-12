import { useCallback, useEffect, useState } from "react";

type Function = () => void;

export function useToggle(): [boolean, Function] {
  const [state, setState] = useState<boolean>(true);
  const toggle = useCallback(() => setState((s) => !s), [setState]);
  return [state, toggle];
}

export function useBoolean(
  state: boolean = false
): [boolean, Function, Function] {
  const [value, setValue] = useState(state);
  const setTrue = useCallback(() => setValue(true), [setValue]);
  const setFalse = useCallback(() => setValue(false), [setValue]);

  return [value, setTrue, setFalse];
}

interface FetchResult<T> {
  data?: T;
  loading?: boolean;
  error?: Error;
  doRefetch: Function;
}
export function useFetch<T>(source: () => Promise<T>): FetchResult<T> {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();
  const [refetch, doRefetch] = useToggle();

  useEffect(() => {
    setLoading(true);
    source()
      .then((value) => {
        setData(value);
        setError(undefined);
      })
      .catch((error) => {
        setData(undefined);
        setError(error);
        console.log({ error });
      })
      .finally(() => setLoading(false));
  }, [source, setData, setLoading, setError, refetch]);

  return { data, loading, error, doRefetch };
}

interface SubmitResult<T> {
  onSubmit(data?: T): void;
  loading?: boolean;
  error?: Error;
}
export function useSubmit<T = any, P = any>(
  source: (data?: T) => Promise<P>,
  onFinish?: Function
): SubmitResult<T> {
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<Error>();
  const onSubmit = useCallback(
    (data?: T) => {
      setLoading(true);
      source(data)
        .then(() => {
          if (!!onFinish) onFinish();
        })
        .catch((error) => {
          setError(error);
          console.log({ error });
        })
        .finally(() => setLoading(false));
    },
    [onFinish, source]
  );

  return { onSubmit, loading, error };
}
