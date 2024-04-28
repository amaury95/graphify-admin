import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface IStack<T> {
  push(elem: T): void;
  pop(): void;
  reset(elem?: T): void;
}
const StackViewContext = createContext<IStack<JSX.Element>>({
  pop: () => {},
  push: () => {},
  reset: () => {},
});
export const useStackView = () => useContext(StackViewContext);
export function StackViewProvider({
  back,
  position,
  children,
}: PropsWithChildren<{
  back(onBack: Function): JSX.Element;
  position: "top" | "bottom";
}>) {
  const [views, setViews] = useState<JSX.Element[]>([]);

  const push = useCallback(
    (view: JSX.Element) => setViews((views) => [...views, view]),
    []
  );

  const pop = useCallback(() => setViews((views) => views.slice(0, -1)), []);

  const reset = useCallback(
    (view?: JSX.Element) => setViews(view ? [view] : []),
    []
  );

  const element = useMemo(
    () => (views.length ? views[views.length - 1] : children),
    [children, views]
  );

  return (
    <StackViewContext.Provider value={{ push, pop, reset }}>
      {position === "top" && views.length > 0 && back(pop)}
      {element}
      {position === "bottom" && views.length > 0 && back(pop)}
    </StackViewContext.Provider>
  );
}
