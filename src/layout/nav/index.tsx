import { useEffect, useState } from "react";
import { Flex, type MenuProps } from "antd";

// styles
import { collapsedSiderStyle, containerStyle, siderStyle } from "./styles";

// components
import CollapseButton from "./components/CollapseButton";
import UserHeader from "./components/UserHeader";
import { MockLogoText } from "mock/logo";
import CustomMenu from "./components/Menu";
import { getFooterItems, getMenuItems } from "./items";
import { useLocation } from "react-router-dom";
import { useSchema } from "providers/SchemaProvider";

interface NavProps {
  collapsed: boolean;
  onCollapse: (index: boolean) => void;
}

export default function Nav({ collapsed, onCollapse }: NavProps) {
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

  const { schema } = useSchema();

  return (
    <Flex
      vertical
      style={collapsed ? collapsedSiderStyle : containerStyle}
      gap="large"
    >
      {/* Header */}
      <Flex justify="space-between" align="center">
        {/* Logo */}
        {!collapsed && <MockLogoText />}

        {/* Collapse Button */}
        <CollapseButton collapsed={collapsed} toggleCollapsed={onCollapse} />
      </Flex>

      <Flex vertical style={siderStyle} justify="space-between">
        {/* Menu */}
        <Flex vertical>
          <CustomMenu items={getMenuItems(collapsed, schema)} active={active} />
          <CustomMenu items={getFooterItems(collapsed)} active={active} />
        </Flex>

        {/* Settings */}
        <Flex vertical>
          <UserHeader collapsed={collapsed} />
        </Flex>
      </Flex>
    </Flex>
  );
}
