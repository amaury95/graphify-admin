import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import { FloatButton, Layout } from "antd";
import { RocketOutlined } from "@ant-design/icons";
import Dashboard from "views/dashboard";
import Tables from "views/tables";
import PageNotFound from "views/PageNotFound";
import Nav from "layout/nav";
import { Header } from "antd/es/layout/layout";
import TopNav from "layout/header";
import SchemaProvider from "providers/schema";

const { Sider, Content } = Layout;

const layoutStyle: React.CSSProperties = {
  padding: "20px",
};

const siderStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  height: "calc(100vh - 40px)",
  minWidth: "250px",
  maxWidth: "320px",
  marginRight: "20px",
  borderRadius: "20px",
};

const headerStyle: React.CSSProperties = {
  background: "transparent",
};

const contentStyle: React.CSSProperties = {
  minHeight: 120,
  lineHeight: "120px",
  paddingLeft: "40px",
  paddingRight: "40px",
};

function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SchemaProvider>
      <Layout style={layoutStyle}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width="20%"
          style={siderStyle}
          onCollapse={(value) => setCollapsed(value)}
          className="glassmorphism"
        >
          <Nav onCollapse={setCollapsed} collapsed={collapsed} />
        </Sider>
        <Layout>
          <Header style={headerStyle}>
            <TopNav />
          </Header>
          <Content style={contentStyle}>
            {/* Float Buttons */}
            <FloatButton
              icon={<RocketOutlined />}
              tooltip={<div>Chat with AI assistant</div>}
            />

            {/* Content */}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </SchemaProvider>
  );
}

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Home */}
        {/* Login */}
        {/* <Route index element={<Home />} /> */}

        {/* App Dashboard */}
        <Route element={<AppLayout />}>
          <Route index element={<div />} />
          <Route path="dashboard/" element={<Dashboard />} />
          <Route path="tables/" element={<Tables />} />
          <Route path="books/" element={<Tables />} />

          <Route path="*" element={<PageNotFound />} />
          {/* <Route path="compounds/" element={<CompoundsView />}>
            <Route index element={<CompoundsList />} />
            <Route path=":id" element={<CompoundDetails />} />
          </Route>
          <Route path="graph/" element={<GraphView />}>
            <Route index element={<Chart />} />
          </Route>
          */}
        </Route>
      </Routes>
    </Router>
  );
}
