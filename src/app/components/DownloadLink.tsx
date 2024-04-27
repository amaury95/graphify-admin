import { baseUrl } from "api/baseUrl";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

export function DownloadLink({
  value,
  children,
}: PropsWithChildren<{ value?: string }>) {
  if (value === undefined) return <></>;
  return <Link to={`${baseUrl}/files/download/${value}`}>{children}</Link>;
}
