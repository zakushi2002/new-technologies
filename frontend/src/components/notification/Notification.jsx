import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import NotifiLayout from "./NotifiLayout";

const Notification = () => {
  return (
    <div className="flex flex-col w-full gap-6">
      <Header />
      <NotifiLayout />

      <Footer />
    </div>
  );
};

export default Notification;
