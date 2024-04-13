import { useState } from "react";

export function KeyInput({
  placeholder, onSet,
}: {
  placeholder?: string;
  onSet(_: string): void;
}) {
  const [value, setValue] = useState<string>("");
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)} />
      <button
        onClick={() => {
          onSet(value);
          setValue("");
        }}
      >
        Set
      </button>
    </>
  );
}
