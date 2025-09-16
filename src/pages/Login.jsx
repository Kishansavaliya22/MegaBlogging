import React, { useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Flex } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import appwriteAuth from "../appwrite/appwriteAuth";
import { storeLogin } from "../store/authSlice";

const Login = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setError("");

    const userData = await appwriteAuth.login(values);

    if ("type" in userData) {
      setError("Login Invalid Credentials");
    } else {
      const userData = await appwriteAuth.getCurrentUser();

      if ("type" in userData) {
        console.log(userData.Error);
      } else {
        dispatch(storeLogin(userData));
        navigate("/");
      }
    }
  };

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      style={{ maxWidth: 360 }}
      onFinish={onFinish}
      className="rounded-md border p-4"
    >
      {error && <p className="mb-1 text-center">{error}</p>}
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your Email!" }]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit" className="text-white">
          Log in
        </Button>
        or <Link to="/signup">Register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default Login;
