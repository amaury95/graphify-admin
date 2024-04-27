import { Link } from "react-router-dom";
import { PropsWithChildren } from "react";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

export function Banner({
  resource, path, children,
}: PropsWithChildren<{
  resource: string;

  path: { name: string; link: string; }[];
}>) {
  return (
    <div className="flex justify-between items-center rounded-2xl p-8 bg-primary-50">
      <div>
        <h1 className="text-2xl font-semibold opacity-90 capitalize">
          {resource}
        </h1>
        <Breadcrumbs className="mt-1" size="sm">
          {path.map(({ name, link }) => (
            <BreadcrumbItem key={name}>
              <Link to={link}>{name}</Link>
            </BreadcrumbItem>
          ))}
          <BreadcrumbItem className="capitalize">{resource}</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      {children}
    </div>
  );
}
