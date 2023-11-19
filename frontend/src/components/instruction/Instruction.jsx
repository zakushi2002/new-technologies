import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import InstructionLayout from "./InstructionLayout";

const Instruction = () => {
  return (
    <div className="flex flex-col w-full gap-6">
      <Header />
      <InstructionLayout />
      <Footer />
    </div>
  );
};

export default Instruction;
