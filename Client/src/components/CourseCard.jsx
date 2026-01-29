import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  if (!course) return null;
  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
      {/* Image */}
      <img
        src={course?.courseThumbnail || "https://via.placeholder.com/400x200"}
        alt={course?.courseTitle || "Course Thumbnail"}
        className="h-48 w-full object-cover"
      />

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {course.courseTitle}
        </h3>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {course.subTitle}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-md font-bold text-green-600">
            ${course.coursePrice}
          </span>

          <button
            onClick={() => navigate(user ? `/courses/${course._id}` : "/login")}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
