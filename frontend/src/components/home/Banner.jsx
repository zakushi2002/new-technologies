import React from "react";

const Banner = () => {
  return (
   
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-row  h-[500px] ">
        <img
          src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/270541902_1928618510642462_2661247953309366017_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEAYGZktnlJkEEURPRSNeiHSgbwKLbQ7lJKBvAottDuUoiX5a330TyO9aNw_EnuVtgMiARzChuYoEC0HhareZY4&_nc_ohc=JkDuCiSw3KcAX8pf2oq&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfCMeYNvp8qUadFBq5Q_2EEav_FgSTp1W30PsqBDVlMpmg&oe=655B71EB"
          alt=""
        />
        <div className="flex flex-col items-center justify-center px-10 shadow-2xl bg-gradient-to-r from-cyan-500 to-blue-500">
          <span className="font-sans text-2xl font-semibold text-white ">
            ĐĂNG KÍ ĐỀ TÀI CÙNG
          </span>
          <span className="font-sans text-6xl font-semibold text-white ">
            HCMUTE
          </span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
