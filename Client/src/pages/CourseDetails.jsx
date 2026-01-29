import { ArrowLeft, Lock, PlayCircle } from "lucide-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

const CourseDetails = () => {
  const params = useParams();
  const courseId = params.courseId;
  const { course } = useSelector((store) => store.course);
  const selectedCourse = course.find((course) => course._id === courseId);
  const [courseLecture, setCourseLecture] = useState(null);
  useEffect(() => {
    const getCourseLecture = async () => {
      try {
        const res = await axios.get(
          `https://lms-o0og.onrender.com/api/v1/course/${courseId}/lecture`,
          { withCredentials: true },
        );
        if (res.data.success) {
          setCourseLecture(res.data.lectures);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCourseLecture();
  });

  return (
    <div className="bg-gray-100 md:p-10">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-md pt-5 mt-14">
        {/* Header */}
        <div className="px-4 py-1 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <button className="px-4 py-2 border border-gray-400 rounded-full font-semibold">
              <ArrowLeft size={16} />
            </button>
            <h1 className="md:text-2xl font-bold text-gray-800">
              {selectedCourse.courseTitle}
            </h1>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold">
            Enroll Now
          </button>
        </div>

        {/* Course Overview */}
        <div className="p-6 flex flex-col lg:flex-row lg:space-x-8">
          <img
            src={selectedCourse.courseThumbnail}
            alt="Course Thumbnail"
            className="w-full bg-red-100 lg:w-1/3 rounded-md mb-4 lg:mb-0"
          />
          <div>
            <p className="text-gray-800 mb-4 font-semibold capitalize">
              {selectedCourse.subTitle}
            </p>
            <p
              className="mb-4 text-gray-700"
              dangerouslySetInnerHTML={{ __html: selectedCourse.description }}
            />
            <p className="text-gray-800 font-semibold">
              ⭐⭐⭐⭐⭐ (4.8) | 1,200 reviews
            </p>
            <div className="mt-1">
              <p className="text-2xl font-bold text-gray-800">₹499</p>
              <p className="text-gray-500 line-through">₹599</p>
            </div>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>✔ 30+ hours of video content</li>
              <li>✔ Lifetime access to course materials</li>
              <li>✔ Certificate of completion</li>
            </ul>
          </div>
        </div>

        {/* Course Details */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            What You'll Learn
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Build dynamic web applications with React and Node.js</li>
            <li>Deploy websites with Vercel and Netlify</li>
            <li>Understand REST APIs and database integration</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">
            Requirements
          </h2>
          <p className="text-gray-700">
            Basic programming knowledge is helpful but not required.
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">
            Who This Course is For
          </h2>
          <p className="text-gray-700">
            Beginners, aspiring developers, and professionals looking to upgrade
            skills.
          </p>
        </div>

        {/* Course Lectures */}
        <div className="flex flex-col md:flex-row justify-between gap-10 p-6">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800">
              Course Curriculum
            </h2>
            <p className="text-gray-700 italic my-2">3 Lectures</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-gray-200 p-4 rounded-md cursor-pointer">
                <span>▶</span>
                <p>Introduction to React</p>
              </div>
              <div className="flex items-center gap-3 bg-gray-200 p-4 rounded-md cursor-pointer">
                <span>▶</span>
                <p>Building REST APIs with Node.js</p>
              </div>
              <div className="flex items-center gap-3 bg-gray-200 p-4 rounded-md cursor-pointer">
                <span>🔒</span>
                <p>Deploying Fullstack Applications</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-white shadow-md rounded-md">
              <div className="p-4 flex flex-col">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={courseLecture ? courseLecture[0]?.VideoUrl : null}
                  controls={true}
                />
                <h1>
                  {courseLecture
                    ? courseLecture[0]?.lectureTitle
                    : "Lecture Title"}
                </h1>
                <hr className="my-2" />
                <p className="text-gray-700">
                  Learn the basics of React including components, state, and
                  props.
                </p>
              </div>
              <div className="p-4 flex justify-end">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold">
                  Continue Course
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
