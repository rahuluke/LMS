import { Link } from "react-router-dom";

import React from "react";
import Button from "../../components/Button";
import CourseTab from "./CourseTab";

const UpdateCourse = () => {
  return (
    <div className="md:p-10 p-4">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl">
          Add detail information regarding course
        </h1>
        <Link to="lecture">
          <button className="py-3 px-4 rounded-md font-semibold bg-sky-400 text-white hover:bg -sky-500">
            Go to lectures page
          </button>
        </Link>
      </div>
      <CourseTab />
    </div>
  );
};

export default UpdateCourse;
