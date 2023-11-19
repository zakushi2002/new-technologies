import React from "react";
import Header from "../common/Header";
import Banner from "./Banner";
import Footer from "../common/Footer";

const Home = () => {
  return (
    <div className="flex flex-col gap-16">
      <Header />
      <Banner />
      <Footer />
    </div>
  );
};

export default Home;
