import React from "react";
import { Menu as AntMenu } from "antd";
import { useNavigate } from "react-router-dom";

const menuStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
};

interface CustomMenuProps {
  items: any;
  active: string;
}

export default function CustomMenu({ items, active }: CustomMenuProps) {
  const navigate = useNavigate();

  return (
    <AntMenu
      defaultSelectedKeys={["dashboard"]}
      selectedKeys={[active]}
      mode="inline"
      items={items}
      style={menuStyle}
      onSelect={() => {}}
      onClick={(item) => navigate("/" + item.key)}
      disabledOverflow={true}
    />
  );
}
