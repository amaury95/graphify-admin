import { useCallback, useEffect, useState } from "react";
// import { useMediaQuery } from "react-responsive";

type Function = () => void;

export function useMobileQuery() {
  //   const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  //   return { isLaptop: !isPortrait, isMobile: isPortrait };
}

export function useToggle(): [boolean, Function] {
  const [state, setState] = useState(true);
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
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<Error>();
  const [refetch, doRefetch] = useToggle();

  useEffect(() => {
    setLoading(true);

    source()
      .then((value) => {
        setData(value);
      })
      .catch((error) => {
        setError(error);
        console.log({ error });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [source, setData, setLoading, setError, refetch]);

  return { data, loading, error, doRefetch };
}

interface SubmitResult {
  onSubmit(): void;
  loading?: boolean;
  error?: Error;
}
export function useSubmit<T = any>(
  source: () => Promise<T>,
  onFinish?: Function
): SubmitResult {
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<Error>();
  const onSubmit = useCallback(() => {
    setLoading(true);
    source()
      .then(() => {
        if (!!onFinish) onFinish();
      })
      .catch((error) => {
        setError(error);
        console.log({ error });
      })
      .finally(() => setLoading(false));
  }, [onFinish, source]);

  return { onSubmit, loading, error };
}

export function useStack<T>() {
  const [stack, setStack] = useState<T[]>([]);

  const reset = useCallback((stack: T[] = []) => setStack(stack), [setStack]);

  const push = useCallback(
    (element: T) => setStack((stack) => [...stack, element]),
    [setStack]
  );

  const pop = useCallback(
    () => setStack((stack) => stack.slice(0, -1)),
    [setStack]
  );

  const peek = useCallback(
    () => (stack.length > 0 ? stack[stack.length - 1] : undefined),
    [stack]
  );

  return { count: stack.length, peek, reset, pop, push };
}
