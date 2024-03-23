import { Form } from "antd";
import React from "react";
import FormInputs from "./components/FormInputs";
import { Element } from "types/schema";

const formStyle: React.CSSProperties = { maxWidth: 600, minWidth: 400 };

interface EditFormProps {
  schema: Element;
}

export default function EditForm({ schema }: EditFormProps) {
  const initValues = {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    Type: {
      Novel: {
        genre: "Fiction",
        publicationYear: 1925,
      },
    },
    mainReview: {
      message: "Review",
      name: "User Name",
    },
    reviews: [
      {
        message: "List",
        name: "User List",
      },
    ],
    tags: ["action", "fiction"],
    bookPrice: {
      new: 200,
      used: 100,
    },
    chapters: {
      "1": "The Phantom Menace",
      "2": "Attack of the Clones",
    },
    portrait: "https://picsum.photos/200/300",
  };
  const [form] = Form.useForm();

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="dynamic_form_complex"
      style={formStyle}
      autoComplete="off"
      initialValues={initValues}
      onFinish={() => alert("here")}
    >
      {/* fields */}
      <FormInputs schema={schema} />
    </Form>
  );
}
