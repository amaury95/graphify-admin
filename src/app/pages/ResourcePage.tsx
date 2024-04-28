import {
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { BackIcon } from "app/assets/icons/Back";
import { EditIcon } from "app/assets/icons/Edit";
import { Banner } from "app/components/Banner";
import { ResourceForm } from "app/components/ResourceForm";
import { ResourceTable } from "app/components/ResourcesTable";
import { useSchema } from "provider/Schema";
import { useClient } from "provider/Service";
import { StackViewProvider } from "provider/StackView";
import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch, useSubmit } from "utils/hooks";
import { Element } from "utils/schema";
import { useObject } from "utils/useObject";

export function ResourcePage() {
  const { resource, key } = useParams();

  const { nodes, edges } = useSchema();
  const specs = useMemo(
    () => nodes[resource!] ?? edges[resource!],
    [edges, nodes, resource]
  );

  const { getResource } = useClient();
  const { data, loading, doRefetch } = useFetch(
    useCallback(
      async () => getResource(resource!, key!),
      [getResource, key, resource]
    )
  );

  return (
    <div className="flex flex-col gap-4 mb-10">
      <Banner
        heading={`${resource}`}
        path={[
          { name: "Home", link: "/" },
          { name: `${resource}`, link: `/${resource}` },
        ]}
        resource={`${key}`}
      >
        {data ? (
          <UpdateResource
            _key={key!}
            doRefetch={doRefetch}
            resource={resource!}
            specs={specs}
            data={data}
          />
        ) : (
          <EditResourceButton specs={specs} isDisabled />
        )}
      </Banner>
      <StackViewProvider
        position="top"
        back={(onBack) => (
          <div>
            <Button
              color="primary"
              variant="light"
              startContent={<BackIcon />}
              onPress={() => onBack()}
            >
              Go Back
            </Button>
          </div>
        )}
      >
        {!loading && data ? (
          <>
            {/* hack to refresh after update  */}
            <div className="hidden">{JSON.stringify(data)}</div>
            <ResourceTable item={data} specs={specs} resource={resource!} />
          </>
        ) : (
          <ResourceTable
            item={{}}
            specs={{ ...specs, fields: [] }}
            loading={loading}
            resource={resource!}
          />
        )}
      </StackViewProvider>
    </div>
  );
}

function UpdateResource({
  resource,
  _key,
  specs,
  data,
  doRefetch,
}: {
  specs: Element;
  data: any;
  doRefetch: Function;
  resource: string;
  _key: string;
}) {
  const { updateResource, deleteResource } = useClient();
  // Update
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { value, ...object } = useObject(data);
  const { onSubmit: updateItem, loading: updatingItem } = useSubmit(
    useCallback(async () => {
      if (await updateResource(resource, _key, value)) {
        doRefetch();
        onClose();
      }
    }, [updateResource, resource, _key, value, doRefetch, onClose])
  );

  // Delete
  const navigate = useNavigate();
  const { onSubmit: deleteItem, loading: deletingItem } = useSubmit(
    useCallback(async () => {
      if (await deleteResource(resource, _key)) {
        navigate(`/${resource}`);
      }
    }, [_key, deleteResource, navigate, resource])
  );

  return (
    <>
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
                Edit {specs.name}
              </ModalHeader>
              <ModalBody>
                <ResourceForm object={object} specs={specs} />
              </ModalBody>
              <ModalFooter>
                <div className="grow">
                  <Button
                    color="danger"
                    variant="light"
                    onPress={deleteItem}
                    isLoading={deletingItem}
                  >
                    Delete
                  </Button>
                </div>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  variant="flat"
                  onPress={updateItem}
                  isLoading={updatingItem}
                >
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <EditResourceButton specs={specs} onPress={onOpen} />
    </>
  );
}

function EditResourceButton({
  specs,
  ...props
}: ButtonProps & { specs: Element }) {
  return (
    <Button color="primary" variant="flat" endContent={<EditIcon />} {...props}>
      Edit {specs.name}
    </Button>
  );
}
