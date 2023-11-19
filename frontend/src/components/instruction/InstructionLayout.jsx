import React from "react";

const InstructionLayout = () => {
  const pdfUrl = "/path/to/your/pdf.pdf";
  return (
    <div className="flex justify-center w-full h-full ">
      <div className="flex flex-col self-stretch w-2/4 gap-6 py-6 ">
        <div className="py-3 border-b-2">
          <p className="font-sans font-medium text-title text-[#074C95]">
            Hướng dẫn
          </p>
        </div>
        <div className="w-full">
          <a href={pdfUrl} download>
            Click để tải tệp PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default InstructionLayout;
