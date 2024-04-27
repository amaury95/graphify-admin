import { useSchema } from "provider/Schema";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { ResourcesTable } from "app/components/ResourcesTable";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { PlusIcon } from "app/assets/icons/Plus";
import { Banner } from "app/components/Banner";
import { useObject } from "utils/useObject";
import { useSubmit } from "utils/hooks";
import { baseUrl } from "api/baseUrl";
import { ResourceForm } from "app/components/ResourceForm";

export function ResourcesPage() {
  const navigate = useNavigate();
  const { resource } = useParams();
  const { nodes, edges } = useSchema();

  const specs = useMemo(
    () => nodes[resource!] ?? edges[resource!],
    [edges, nodes, resource]
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { value, clear, ...object } = useObject({});
  const { onSubmit, loading } = useSubmit(
    useCallback(async () => {
      const resp = await fetch(baseUrl + "/" + resource, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(value),
      });
      const [key] = await resp.json();
      navigate(`/${resource}/${key}`);
    }, [navigate, resource, value])
  );

  if (!resource || !specs) return <Navigate to="/" />;

  return (
    <div className="flex flex-col gap-4">
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        scrollBehavior="inside"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create {specs.name}
              </ModalHeader>
              <ModalBody>
                <ResourceForm object={object} specs={specs} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onSubmit} isLoading={loading}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Banner resource={resource} path={[{ name: "Home", link: "/" }]}>
        <Button
          variant="flat"
          color="secondary"
          endContent={<PlusIcon />}
          onClick={onOpen}
        >
          New {specs.name}
        </Button>
      </Banner>
      <ResourcesTable resource={resource} specs={specs} />
    </div>
  );
}
