/* eslint-disable no-unused-vars */
import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { NavLink, useNavigate } from "react-router-dom";

const LeftSideBar = () => {
  const navigate = useNavigate();
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const siderItems = [
    getItem("Profile Edit", "profile", <UploadOutlined />),
    getItem("Register Topic", "registertopic", <UserOutlined />),
    getItem("Brower Topic", "browsertopic", <UserOutlined />),
    getItem("Logout", "login", <UserOutlined />),
    // getItem("", "5", <FileOutlined />),
  ];
  const handleContents = (data) => {
    switch (data.key) {
      case "profile":
        navigate(`/teacher/${data.key}`);
        break;
      case "registertopic":
        navigate(`/teacher/${data.key}`);
        break;
      case "browsertopic":
        navigate(`/teacher/${data.key}`);
        break;
      case "logout":
        navigate(`/login`);
        break;
      default:
        break;
    }
  };
  return (
    <Menu
      theme="dark"
      className="mt-14"
      mode="inline"
      defaultSelectedKeys={["0"]}
      items={siderItems}
      onClick={(e) => handleContents(e)}
    />
  );
};

export default LeftSideBar;
