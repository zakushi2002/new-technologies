import React from "react";

const Footer = () => {
  return (
    <div className="flex h-[120px] shadow-2xl rounded bg-blue-900  items-center bottom-0 fixed w-full">
      <div className="flex flex-col mx-auto ">
        <span className="font-medium text-white">Add</span>
        <span className="font-medium text-white">
          01 Vo Van Ngan, Thu Duc City
        </span>
      </div>
      <div className="flex flex-col mx-auto">
        <span className="font-medium text-white">Tel</span>
        <span className="font-medium text-white">
          (+84 - 28) 37222763 - (+84 - 28) 37221223 - 8410
        </span>
      </div>
      <div className="flex flex-col mx-auto">
        <span className="font-medium text-white">Facebook</span>
        <a
          href="https://www.facebook.com/clcspkt"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-white underline hover:text-blue-500"
        >
          www.facebook.com/clcspkt
        </a>
      </div>
    </div>
  );
};

export default Footer;
