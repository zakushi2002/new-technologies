import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const StudentPage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const sliced_text = location.pathname.split("/")[2];
  const handleContents = (data) => {
    switch (data.key) {
      case "profile":
        navigate(`/my/${data.key}`);
        break;
      case "registtopic":
        navigate(`/my/${data.key}`);

        break;
      case "mytopic":
        navigate(`/my/${data.key}`);

        break;
      default:
        break;
    }
  };
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const siderItems = [
    getItem("Manage account", "profile", <UserOutlined />),
    getItem("Regist topic", "registtopic", <UserOutlined />),
    getItem("Manage topic", "mytopic", <UserOutlined />),
    // getItem("", "5", <FileOutlined />),
  ];
  return (
    <Layout className=" absolute h-full w-full">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={sliced_text}
          items={siderItems}
          onClick={(e) => handleContents(e)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
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
          >
            {/* {params.content === "profile" && (
              <ManageProfile bg={colorBgContainer} />
            )} */}
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default StudentPage;
