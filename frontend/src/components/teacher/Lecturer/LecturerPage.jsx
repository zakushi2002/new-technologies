import { BrowserRouter, Route, Routes } from "react-router-dom";
import BrowserTopic from "../pages/BrowserTopic";
import EditInfor from "../pages/EditInfor";
import MainPage from "./MainPage";
import RegisterTopic from "../pages/RegisterTopic";

const LecturerPage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainPage></MainPage>}>
          <Route path="/" element={<RegisterTopic></RegisterTopic>}></Route>
          <Route path="/browse" element={<BrowserTopic></BrowserTopic>}></Route>
          <Route path="/editinfo" element={<EditInfor></EditInfor>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default LecturerPage;
