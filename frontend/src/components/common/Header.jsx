import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex h-[60px] shadow-2xl rounded flex-row-reverse px-6">
        <div className="flex flex-row items-center ">
          <div
            className="flex flex-col items-center justify-center h-full px-3 my-auto cursor-pointer hover:bg-slate-400"
            onClick={() => {
              navigate("/notification");
            }}
          >
            <div className="font-sans font-semibold ">Thông báo</div>
          </div>
          <div className="h-6 w-[1px] bg-slate-600 "></div>
          <div
            className="flex flex-col items-center justify-center h-full px-3 my-auto cursor-pointer hover:bg-slate-400"
            onClick={() => {
              navigate("/instruction");
            }}
          >
            <div className="font-sans font-semibold ">Hướng dẫn</div>
          </div>
          <div className="h-6 w-[1px] bg-slate-600 "></div>

          <div className="flex flex-col items-center justify-center h-full px-3 my-auto cursor-pointer hover:bg-slate-400">
            <div className="font-sans font-semibold ">Đề tài tham khảo</div>
          </div>
          <div className="h-6 w-[1px] bg-slate-600 "></div>

          <div className="flex flex-col items-center justify-center h-full px-3 my-auto cursor-pointer hover:bg-slate-400">
            <div className="font-sans font-semibold ">Danh sách giáo viên</div>
          </div>

          <div className="h-10 px-3 pt-2 my-auto ml-10 font-sans font-semibold text-center text-white align-middle bg-blue-800 rounded-lg cursor-pointer">
            Đăng nhập
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
