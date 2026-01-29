import CourseCard from "../components/CourseCard";
import { setCourse } from "../redux/courseSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Courses = () => {
  const dispatch = useDispatch();
  const { course } = useSelector((store) => store.course);
  useEffect(() => {
    const getAllPublishedCourse = async () => {
      try {
        const res = await axios.get(
          `https://lms-nswg.onrender.com/api/v1/course/published-courses`,
          { withCredentials: true },
        );
        if (res.data.success) {
          dispatch(setCourse(res.data.courses));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllPublishedCourse();
  });
  return (
    <div className="bg-gray-100 pt-14">
      <div className="min-h-screen max-w-7xl mx-auto py-20">
        <div className="px-4">
          <h1 className="text-6xl font-bold text-center text-gray-800 mb-4">
            Our Courses
          </h1>
          <p className="text-center text-gray-700 mb-12 font-medium ">
            Learn industry-relevant skills with expert-designed courses,
            hands-on projects, and practical guidance.
          </p>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {course?.map((course, index) => {
              return <CourseCard course={course} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
