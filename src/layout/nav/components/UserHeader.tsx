import React from "react";
import { Flex, Avatar, Typography, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "providers/AuthProvider";

const { Text } = Typography;

const nameStyle: React.CSSProperties = {
  fontSize: "16px",
};

const titleStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#aaa",
};

const collapsedContainerStyle: React.CSSProperties = {
  paddingBottom: "10px",
};

interface UserHeaderProps {
  collapsed: boolean;
}

export default function UserHeader({ collapsed }: UserHeaderProps) {
  const { logout, account, loading } = useAuth();
  if (collapsed) {
    return (
      <Flex justify="center" align="center" style={collapsedContainerStyle}>
        <Avatar
          size={36}
          style={{ background: "lightgray" }}
          icon={<UserOutlined />}
        />
      </Flex>
    );
  }
  return (
    <Flex justify="space-between" align="center">
      <Flex align="center" gap={10}>
        {/* Avatar */}
        <Avatar
          size={40}
          style={{ background: "lightgray" }}
          icon={<UserOutlined />}
        />
        {/* Description */}
        <Flex vertical>
          {/* Name */}
          <Text style={nameStyle} className="sidebar-text">
            {account?.firstName} {account?.lastName}
          </Text>
          {/* Title */}
          <Text style={titleStyle} className="sidebar-text">
            Data Science
          </Text>
        </Flex>
      </Flex>

      {/* Log out */}
      <Button
        type="text"
        icon={<LogoutOutlined />}
        onClick={logout}
        disabled={loading}
      />
    </Flex>
  );
}
