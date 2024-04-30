import { PropsWithChildren } from "react";
import { downloadLink } from "utils/downloadLink";

export function DownloadLink({
  value,
  children,
}: PropsWithChildren<{ value?: string }>) {
  if (value === undefined) return <></>;
  return (
    <a href={downloadLink(value)} target="_blank" rel="noreferrer" download>
      {children}
    </a>
  );
}
