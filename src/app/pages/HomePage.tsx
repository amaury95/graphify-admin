import { Button } from "@nextui-org/react";
import { useSearch } from "app/components/SearchInput";
import React from "react";

export function HomePage() {
  const {value} = useSearch()
  return (
    <div>
      <div className="rounded p-3 m-4 bg-white shadow">
        Hallo {value}
      </div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button color="primary" radius="full" variant="shadow">
        Button
      </Button>
    </div>
  );
}
