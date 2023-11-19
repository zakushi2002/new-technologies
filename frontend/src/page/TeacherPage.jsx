import { Layout, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Header } from "antd/es/layout/layout";
import LeftSideBar from "../components/teacher/Lecturer/LeftSideBar";
import FooterSection from "../components/teacher/Lecturer/FooterSection";
import ContentPage from "../components/teacher/pages/ContentPage";

const TeacherPage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div>
      <Layout className="">
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

          <LeftSideBar></LeftSideBar>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          />
          <ContentPage></ContentPage>
          <FooterSection></FooterSection>
        </Layout>
      </Layout>
    </div>
  );
};

export default TeacherPage;
