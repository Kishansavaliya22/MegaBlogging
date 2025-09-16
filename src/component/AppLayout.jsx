import React, { useState } from "react";
import { Button, Layout, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { Outlet, useNavigate } from "react-router-dom";
import appwriteAuth from "../appwrite/appwriteAuth";
import { storeLogout } from "../store/authSlice";

const { Header, Content, Footer } = Layout;
const items = [
  [
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
  ],
];

const AppLayout = () => {
  const [current, setCurrent] = useState();

  const authStatus = useSelector((state) => state.authStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuHandler = (e) => {
    navigate(e.key);
    setCurrent(e.key);
  };

  const logoutHandler = async () => {
    await appwriteAuth.logout();

    dispatch(storeLogout());
    navigate("/login");
  };

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div>
          <Link to="/">
            <img src="src\assets\logo.jpg" alt="Logo" className="size-8" />
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[current]}
          onClick={menuHandler}
          items={!authStatus ? items[0] : items[1]}
          style={{ flex: 1, minWidth: 0 }}
        />
        {authStatus && <Button onClick={logoutHandler}>Logout</Button>}
      </Header>
      <Content className="p-3 justify-items-center">
        <Outlet />
      </Content>
      <Footer>
        Design ©{new Date().getFullYear()} Created by Kishankumar Savaliya
      </Footer>
    </Layout>
  );
};
export default AppLayout;
