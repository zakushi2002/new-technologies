import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className=" absolute w-full h-full">
      <Outlet />
    </div>
  );
};

export default MainLayout;
