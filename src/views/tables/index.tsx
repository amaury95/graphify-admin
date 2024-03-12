import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Flex, Modal, Typography } from "antd";
import Search from "antd/es/input/Search";

import List from "./List";
import CreateNewForm from "views/forms/CreateForm";
// import { schema } from "mock/schema";
import { capitalise, makeSingular } from "utils/functions";
import { useSchema } from "hooks/api";

const { Title } = Typography;

const buttonStyle: React.CSSProperties = {
  border: "none",
};

export default function Tables() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Navigation Hooks
  const { pathname } = useLocation();
  const pathSegments = pathname.split("/");

  const [active, setActive] = useState(pathSegments[1]);

  useEffect(() => {
    // read with API call
    const navItems = ["dashboard", "books"];

    // extract first word after /
    const regex = /\/([^/]+)/;
    // search for a match in the URL using the regex pattern
    const match = pathname.match(regex);
    if (match) {
      const existingLink = navItems.find((item) => item === match[1]);
      setActive(existingLink ?? match[1]);
    }
  }, [pathname]);

  const { data, loading, error } = useSchema();

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <Flex vertical gap={20}>
      {/* Header */}
      <Flex justify="space-between" align="center">
        {/* Title & Subtitle */}
        <Flex vertical>
          <Title level={2} style={{ marginBottom: "0px" }}>
            {capitalise(active)}
          </Title>
          {/* <Text style={{fontSize: "14px"}}>Tables</Text> */}
        </Flex>

        {/* Actions */}
        <Flex gap={6}>
          <Button style={buttonStyle} onClick={showModal}>
            Create new
          </Button>
          <Button style={buttonStyle}>Action Button</Button>
        </Flex>
      </Flex>

      {/* Content */}
      <Flex vertical gap={2}>
        {/* Search */}
        <Search placeholder="input search text" style={{ width: 200 }} />

        {/* List */}
        <List />
      </Flex>

      {/* Modal */}
      <Modal
        title={"New " + capitalise(makeSingular(active))}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
      >
        {<CreateNewForm schema={data["nodes"]["books"]} />}
      </Modal>
    </Flex>
  );
}
