import React, { useState } from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Flex } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import appwriteAuth from "../appwrite/appwriteAuth";
import { storeLogin } from "../store/authSlice";

const SignUp = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setError("");

    const userData = await appwriteAuth.createAccount(values);

    if ("type" in userData) {
      setError("Registration error");
    } else {
      const userData = await appwriteAuth.getCurrentUser();

      if ("type" in userData) {
        console.log(userData.Error);
      } else {
        dispatch(storeLogin(userData));
      }
    }
  };

  return (
    <Form
      name="signup"
      initialValues={{ remember: true }}
      style={{ maxWidth: 360 }}
      onFinish={onFinish}
      className="rounded-md border p-4"
    >
      {error && <p className="mb-1 text-center">error</p>}
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please input your Name!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Full Name" />
      </Form.Item>
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
          Register now
        </Button>
        or <Link to="/login">Log in</Link>
      </Form.Item>
    </Form>
  );
};

export default SignUp;
