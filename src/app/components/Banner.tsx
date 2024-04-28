import { Link } from "react-router-dom";
import { PropsWithChildren } from "react";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

export function Banner({
  heading,
  resource,
  path,
  children,
}: PropsWithChildren<{
  heading: string;
  resource: string;
  path: { name: string; link: string }[];
}>) {
  return (
    <div className="flex justify-between items-center rounded-2xl p-6 bg-primary-50">
      <div>
        <h1 className="text-xl font-semibold opacity-90 capitalize tracking-wide">
          {heading}
        </h1>
        <Breadcrumbs className="mt-1" size="sm">
          {path.map(({ name, link }) => (
            <BreadcrumbItem key={name}>
              <Link to={link} className="capitalize">
                {name}
              </Link>
            </BreadcrumbItem>
          ))}
          <BreadcrumbItem className="capitalize">{resource}</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      {children}
    </div>
  );
}
