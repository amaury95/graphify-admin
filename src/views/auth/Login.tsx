import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { Button, Checkbox, Col, Form, Input, Row, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

export function Login() {
  const [email, setEmail] = useState<string>("admin@graphify.ovh");
  const [password, setPassword] = useState<string>("mysecret");

  const { login, loading, loggedIn } = useAuth();

  if (loggedIn) return <Navigate to="/" />;

  const onFinish = (e: any) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Row>
      <Col
        span={12}
        style={{
          height: "100vh",
          background: "linear-gradient(0deg, #37bc5d 0%, #0c5c43 100%)",
        }}
      ></Col>
      {/* Content */}
      <Col span={12} style={{ padding: "8%" }}>
        <Title>Welcome Back</Title>
        <Title level={4}>Sign to your account now!</Title>

        <Form
          name="normal_login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
            label="Email Addresse"
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              onChange={(e) => setEmail(e.target.value)}
              variant="filled"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
            label="Password"
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              variant="filled"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a href="/">Forgot password</a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={onFinish}
            >
              Log in
            </Button>
            Or <a href="/">register now!</a>
          </Form.Item>
        </Form>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            login({ email, password });
          }}
        >
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" disabled={loading} />
        </form>
      </Col>
    </Row>
  );
}
