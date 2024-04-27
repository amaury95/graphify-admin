import { useSchema } from "provider/Schema";
import { Navigate, useParams } from "react-router-dom";
import { useMemo } from "react";
import { ResourcesTable } from "app/components/ResourcesTable";
import { Button } from "@nextui-org/react";
import { PlusIcon } from "app/assets/icons/Plus";
import { Banner } from "app/components/Banner";

export function ResourcesPage() {
  const { resource } = useParams();
  const { nodes, edges } = useSchema();

  const specs = useMemo(
    () => nodes[resource!] ?? edges[resource!],
    [edges, nodes, resource]
  );

  if (!resource || !specs) return <Navigate to="/" />;

  return (
    <div className="flex flex-col gap-4">
      <Banner resource={resource} path={[{ name: "Home", link: "/" }]}>
        <Button variant="flat" color="secondary" endContent={<PlusIcon />}>
          New {specs.name}
        </Button>
      </Banner>
      <ResourcesTable resource={resource} specs={specs} />
    </div>
  );
}
