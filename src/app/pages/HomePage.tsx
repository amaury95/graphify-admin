import { Button } from "@nextui-org/react";
import React from "react";

export function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button color="primary" radius="full" variant="shadow">
        Button
      </Button>
    </div>
  );
}
