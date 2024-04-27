import { Input } from "@nextui-org/react";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { SearchIcon } from "app/assets/icons/Search";
import { CrossIcon } from "app/assets/icons/Cross";

interface ISearchContext {
  value?: string;
  setValue: React.Dispatch<string>;
}

const SearchContext = createContext<ISearchContext>({
  setValue: () => {},
});

export const useSearch = () => useContext(SearchContext);

export function SearchProvider({ children }: PropsWithChildren) {
  const [value, setValue] = useState<string>();
  return (
    <SearchContext.Provider value={{ value, setValue }}>
      {children}
    </SearchContext.Provider>
  );
}

export function SearchInput() {
  const { value, setValue } = useSearch();

  const EndContent = useCallback(
    () => (
      <div className="cursor-pointer" onClick={() => setValue("")}>
        <CrossIcon />
      </div>
    ),
    [setValue]
  );

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search"
      startContent={<SearchIcon />}
      endContent={value ? <EndContent /> : null}
      radius="full"
      fullWidth={false}
      classNames={{
        base: "max-w-96",
        innerWrapper: "pl-2",
      }}
    />
  );
}
