import ManageThesis from "../components/admin/ManageThesis";
import DetailTopic from "../components/student/DetailTopic";
import ManageProfile from "../components/student/ManageProfile";
import ManageTopic from "../components/student/ManageTopic";
import RegisTopic from "../components/student/RegisTopic";
import BrowserTopic from "../components/teacher/pages/BrowserTopic";
import EditInfor from "../components/teacher/pages/EditInfor";
import RegisterTopic from "../components/teacher/pages/RegisterTopic";
import MainLayout from "../layouts/MainLayout";
import AdminPage from "../page/AdminPage";
import HomePage from "../page/HomePage";
import InstructionPage from "../page/InstructionPage";
import NotificationPage from "../page/NotificationPage";
import StudentPage from "../page/StudentPage";
import TeacherPage from "../page/TeacherPage";

// Xem cấu trúc routes ở https://reactrouter.com/en/main/routers/create-browser-router#routes
export default function init(routes) {
  const route = {
    path: "/",

    element: <MainLayout />,
    // Element là AuthenLayout, các children muốn hiển thị được trong AuthenLayout thì trong Layout phải có outlet mới hiển thị được
    // outlet đóng vai trò tương tự children
    // Xem thêm ở https://reactrouter.com/en/main/components/outlet
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "my/",
        element: <StudentPage />,
        children: [
          {
            path: "profile",
            element: <ManageProfile />,
          },
          {
            path: "registtopic",
            element: <RegisTopic />,
          },
          {
            path: "mytopic",
            element: <ManageTopic />,
          },
          {
            path: "mytopic/:id",
            element: <DetailTopic />,
          },
        ],
      },
      {
        path: "admin/",
        element: <AdminPage />,
        children: [
          {
            path: "thesis",
            element: <ManageThesis />,
          },
        ],
      },
      {
        path: "/notification",
        element: <NotificationPage />,
      },
      {
        path: "/instruction",
        element: <InstructionPage />,
      },
      {
        path: "view/:content",
        element: <TeacherPage />,
      },
      {
        path: "teacher/",
        element: <TeacherPage />,
        children: [
          {
            path: "profile",
            element: <EditInfor />,
          },
          {
            path: "registertopic",
            element: <RegisterTopic />,
          },
          {
            path: "browsertopic",
            element: <BrowserTopic />,
          },
        ],
      },
    ],
  };
  // push route
  routes.push(route);
}
