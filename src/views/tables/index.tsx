import { useCallback, useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { Button, Flex, Form, Modal, Typography } from "antd";
import Search from "antd/es/input/Search";

import List from "./List";
import CreateNewForm from "views/forms/CreateForm";
import { capitalise, makeSingular } from "utils/functions";
import { useSchema } from "providers/SchemaProvider";
import { useSubmit } from "utils/hooks";
import { baseURL } from "hooks/api";

const { Title } = Typography;

const buttonStyle: React.CSSProperties = {
  border: "none",
};

export default function Tables() {
  const { schema } = useSchema();
  const { collection } = useParams();

  const [form] = Form.useForm();

  // api
  const { onSubmit, loading } = useSubmit<string>(
    useCallback(
      async (data) =>
        await fetch(baseURL + "/" + collection, {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: data,
        }),
      [collection]
    )
  );

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // push data
    // alert(formResponse);
    // onValuesChange(JSON.stringify(form.getFieldsValue(), null, 2));
    console.log("Submitting");
    console.log(JSON.stringify(form.getFieldsValue(), null, 2));

    // onSubmit(JSON.stringify(form.getFieldsValue(), null, 2))
    // iterate through formValues and format it to response
    setIsModalOpen(false);
    // form.setFieldsValue({})
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    // form.setFieldsValue({})
  };

  if (!collection) return <Navigate to={"/"} />;

  return (
    <Flex vertical gap={20}>
      {/* Header */}
      <Flex justify="space-between" align="center">
        {/* Title & Subtitle */}
        <Flex vertical>
          <Title level={2} style={{ marginBottom: "0px" }}>
            {capitalise(collection)}
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
        title={"New " + capitalise(makeSingular(collection))}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
      >
        <CreateNewForm schema={schema.nodes[collection]} form={form} />
      </Modal>
    </Flex>
  );
}
