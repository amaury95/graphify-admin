import React from "react";
import { Button, Flex } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const fullStyle: React.CSSProperties = {
  zIndex: 10,
};

const collapsedStyle: React.CSSProperties = {
  zIndex: 10,
};

interface CollapseButtonProps {
  collapsed: boolean;
  toggleCollapsed: (value: boolean) => void;
}

export default function CollapseButton({
  collapsed,
  toggleCollapsed,
}: CollapseButtonProps) {
  return (
    <Flex justify="center" style={{ width: collapsed ? "100%" : "auto" }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        size="middle"
        onClick={() => toggleCollapsed(!collapsed)}
      />
    </Flex>
  );
}
