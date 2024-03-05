import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Form, Button, message, Upload } from "antd";

interface ImageUploadProps {
  name: string
}

const props: UploadProps = {
  name: "file",
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default function ImageUpload({name} : ImageUploadProps) {
  return (
    <Form.Item label={name} valuePropName="fileList">
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Form.Item>
  );
}
