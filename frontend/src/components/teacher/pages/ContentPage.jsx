/* eslint-disable no-unused-vars */
import { theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet, useParams } from "react-router-dom";
import EditInfor from "./EditInfor";
import RegisterTopic from "./RegisterTopic";
import BrowserTopic from "./BrowserTopic";

const ContentPage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const params = useParams();
  return (
    <Content
      className="h-fit"
      style={{
        margin: "24px 16px 0",
      }}
    >
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
        }}
        className="h-fit"
      >
        {/* {params.content === "profile" && <EditInfor bg={colorBgContainer} />}
        {params.content === "registertopic" && <RegisterTopic />}
        {params.content === "browsertopic" && <BrowserTopic />} */}
        <Outlet></Outlet>
      </div>
    </Content>
  );
};

export default ContentPage;
