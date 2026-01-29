import React from "react";
import Navbar from "./Navbar";
import { Search, User } from "lucide-react";

const Hero = () => {
  return (
    <div className="bg-slate-800 pt-14 text-white">
      <div className="lg:h-[700px] max-x-7xl mx-auto flex md:flex-row flex-col gap-10 items-center ml-30 ">
        <div className="px-10  md:px-0">
          <h1 className="px-5 text-7xl mt-10 md:mt-0 md-text-6xl font-extrabold text-gray-200">
            Explore our <span className="text-sky-500">1400+</span>
            <br />
            online courses for all
          </h1>
          <p className="px-5 py-2">
            Learn at your own pace with high-quality content created by industry
            experts and <br /> take the next step toward your goals.
          </p>
          <div className="inline-flex relative  px-5">
            <input
              type="text"
              placeholder="Search your Course here..."
              className="bg-gray-200  w-[35px] md:w-[450px] text-gray-800 p-4 pr-40 rounded-lg rounded-r-xl placeholder:text-gray-500"
            />
            <button className="px-4 py-[14px] flex gap-1 items-center bg-blue-500 font-semibold absolute right-0 text-white rounded-r-lg text-xl">
              Search
              <Search width={20} height={20} />
            </button>
          </div>
        </div>
        {/* IMAGE */}
        <div className="flex md:h-[700px] items-end relative px-4 md:px-0 ml-20">
          <img
            className="w-[450px] shadow-blue-500 drop-shadow-lg"
            src="https://jeetsarthi.com/wp-content/uploads/2025/09/indian-student-web.webp"
            alt=""
          />
          <div className="bg-slate-200 hidden md:flex gap-3 items-center  rounded-md absolute top-[40%] right-0 px-4 py-2">
            <div className="rounded-full bg-blue-400 p-2 text-white">
              <User />
            </div>
            <div>
              <h1 className="font-bold text-2xl text-black">4500+</h1>
              <p className=" text-sm text-gray-600 leading-none">
                Active Studends
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
