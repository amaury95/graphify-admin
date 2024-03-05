import React from "react";
import {
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  CalendarOutlined,
  BarsOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  UsergroupAddOutlined,
  BuildOutlined,
} from "@ant-design/icons";
import {
  Popconfirm,
  type MenuProps,
  message,
  Tag,
  Flex,
  Space,
  Switch,
} from "antd";
import { Link } from "react-router-dom";
import { capitalise } from "utils/functions";
import ThemeSwitch from "./components/ThemeSwitch";

type MenuItem = Required<MenuProps>["items"][number];


function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const createLinkNode = (name: string) => {
  return (
    <Flex justify="space-between">
      <Link to={name} style={{ width: "100%" }}>
        {capitalise(name)}
      </Link>
      <Space>
        {name === "tasks" && (
          <Tag bordered={false} color="default">
            14
          </Tag>
        )}
        {name === "users" && (
          <Tag bordered={false} color="default">
            5
          </Tag>
        )}
      </Space>
    </Flex>
  );
};

const createDotNode = () => {
  return (
    <Flex justify="center">
      <div
        style={{
          width: "6px",
          height: "6px",
          backgroundColor: "green",
          borderRadius: "50%",
        }}
      />
    </Flex>
  );
};

const createSwitchNode = (name: string) => {
  return (
    <Flex justify="space-between" align="center">
      <Flex>{name}</Flex>
      <ThemeSwitch />
      {/* <Switch defaultChecked onChange={onChange} size="small" /> */}
    </Flex>
  );
};

const confirm = (e: any) => {
  message.success("Successfully logged out");
};

const cancel = (e: any) => {};

const CreateLogoutConfirmation = () => {
  return (
    <Popconfirm
      title="Are you sure you want to log out?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
      style={{ width: "100%" }}
      placement="right"
      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
    >
      <div style={{ width: "100%" }}>Log Out</div>
    </Popconfirm>
  );
};

export function getMenuItems(collapsed: boolean) {
  const menuItems: MenuProps["items"] = [
    getItem(
      collapsed ? createDotNode() : "Dashboard",
      "title1",
      null,
      [
        getItem(
          createLinkNode("dashboard"),
          "dashboard",
          <DashboardOutlined />
        ),
        getItem(createLinkNode("users"), "users", <TeamOutlined />),
      ],
      "group"
      // "System"
    ),

    getItem(
      collapsed ? createDotNode() : "Tables",
      "title2",
      null,
      [
        getItem(createLinkNode("admins"), "admins", <CalendarOutlined />),
        getItem(createLinkNode("books"), "books", <BarsOutlined />),
      ],
      "group"
    ),
  ];

  return menuItems;
}

export function getFooterItems(collapsed: boolean) {
  const footerItems: MenuProps["items"] = [
    getItem(
      collapsed ? createDotNode() : "System",
      "title3",
      null,
      [
        getItem(createLinkNode("Help Center"), "help", <InfoCircleOutlined />),
        getItem(createLinkNode("Settings"), "settings", <SettingOutlined />),
        getItem(createSwitchNode("Theme"), "theme", <BuildOutlined />),
        // getItem(<CreateLogoutConfirmation />, "m2-key3", <LogoutOutlined />),
      ],
      "group"
    ),
  ];

  return footerItems;
}
