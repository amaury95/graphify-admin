import {
  BellOutlined,
  DeleteOutlined,
  DownloadOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Flex } from "antd";
import React from "react";

const containerStyle: React.CSSProperties = {
  height: "100%",
};

const buttonStyle: React.CSSProperties = {
  border: "none",
};

const actionIconStyle: React.CSSProperties = {
  fontSize: "14px",
};

export default function TopNav() {
  return (
    <Flex justify="space-between" align="center" style={containerStyle}>
      {/* left buttons */}
      <Flex gap={6}>
        <Button
          shape="round"
          type="primary"
          style={buttonStyle}
          icon={<DownloadOutlined />}
        >
          Download data
        </Button>
        <Button shape="round" style={buttonStyle} icon={<DeleteOutlined />}>
          Empty data
        </Button>
      </Flex>

      {/* right actions */}
      <Flex gap={6}>
        <Button
          size="large"
          shape="circle"
          icon={<SearchOutlined style={actionIconStyle} />}
          style={buttonStyle}
        />
        <Button
          size="large"
          shape="circle"
          icon={<BellOutlined style={actionIconStyle} />}
          style={buttonStyle}
        />
      </Flex>
    </Flex>
  );
}
