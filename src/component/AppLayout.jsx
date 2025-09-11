import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useSelector } from "react-redux";
import { Link, Links } from "react-router";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;
const items = [
  [
    {
      label: "Home",
      key: "/",
    },
    {
      label: "Login",
      key: "/login",
    },
    {
      label: "SignUp",
      key: "/signup",
    },
  ],
  [
    {
      label: "Read Blog",
      key: "/readblog",
    },
    {
      label: "Edit Blog",
      key: "/editblog",
    },
    {
      label: "Logout",
      key: "/logout",
    },
  ],
];

const AppLayout = () => {
  const [current, setCurrent] = useState();

  const authStatus = useSelector((state) => state.authStatus);
  const navigate = useNavigate();

  const menuHandler = (e) => {
    navigate(e.key);
    setCurrent(e.key);
  };

  return (
    <Layout>
      <Header>
        <Link to="/">
          <img src="" alt="" />
        </Link>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[current]}
          onClick={menuHandler}
          items={!authStatus ? items[0] : items[1]}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content className="h-screen p-1">
        <Outlet />
      </Content>
      <Footer>
        Design ©{new Date().getFullYear()} Created by Kishankumar Savaliya
      </Footer>
    </Layout>
  );
};
export default AppLayout;
