import Title from "antd/es/skeleton/Title";
import React from "react";
import NotifiItem from "./NotifiItem";

const NotifiLayout = () => {
  return (
    <div className="flex justify-center w-full h-full ">
      <div className="flex flex-col self-stretch w-2/4 gap-6 py-6 ">
        <div className="py-3 border-b-2">
          <p className="font-sans font-medium text-title">Thông báo</p>
        </div>
        <div className="flex flex-col self-stretch">
          <NotifiItem />
          <NotifiItem />
          <NotifiItem />
          <NotifiItem />
          <NotifiItem />
          <NotifiItem />
          <NotifiItem />
          <NotifiItem />
          <NotifiItem />
        </div>
      </div>
    </div>
  );
};

export default NotifiLayout;
