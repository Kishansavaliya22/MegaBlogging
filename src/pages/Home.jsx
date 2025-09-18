import { Button, Flex } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const authStatus = useSelector((state) => state.authStatus);
  const navigate = useNavigate();

  return (
    <Flex vertical gap="middle" className="p-5">
      <Flex>
        <div className="text-5xl">
          "The secret to getting ahead is getting started."
        </div>
      </Flex>
      <Flex align="center" gap="large" justify="space-around">
        <Flex vertical gap="middle">
          <Button onClick={() => navigate("/readblog")}>Read Blog</Button>
          {authStatus ? (
            <Button onClick={() => navigate("/addpost")}>Add Blog</Button>
          ) : null}
        </Flex>
        <div>
          <img
            className="w-109"
            src="src\assets\Lovepik_com-450071175-video blog management vector illustration  1.png"
            alt="Blog Photo"
          />
        </div>
      </Flex>
    </Flex>
  );
};

export default Home;
