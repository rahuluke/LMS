import axios from "axios";
import { Loader, Loader2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [courseTitle, setcourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const getSelectedCategory = (value) => {
    setCategory(value);
  };
  const createCourseHandler = async () => {
    console.log(courseTitle, category);
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/course/",
        { courseTitle, category },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        navigate("/admin/course");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <div className="px-10">
        <h1 className="text-5xl font-bold">
          Lets Add <span className="text-sky-400">Courses</span>
        </h1>
        <p className="mt-4">
          This section is designed for administrators to create and manage
          courses on the platform.<br></br>Admins can add new courses by
          entering key details such as the course title and category
        </p>
        <div className="w-full space-y-2  mt-10">
          <h2 className="text-lg font-semibold text-gray-800">Course Title</h2>

          <input
            value={courseTitle}
            onChange={(e) => setcourseTitle(e.target.value)}
            type="text"
            placeholder="Enter course title"
            className="w-full bg-white px-4 py-2 rounded-md focus:outline-none"
          />
        </div>
        <div className="w-full space-y-2 mt-4">
          {/* Heading */}
          <h2 className="text-lg font-semibold text-gray-800">Category</h2>

          {/* Select dropdown */}
          <select
            onChange={(e) => getSelectedCategory(e.target.value)}
            className="w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-gray-800"
            defaultValue=""
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="web-dev">Web Development</option>
            <option value="programming">Programming</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4 px-10 mt-10">
        {/* Button 1 */}
        <button
          onClick={() => navigate("/admin/course")}
          className="px-5 py-2 bg-white text-black rounded-md font-semibold border border-gray-300 hover:bg-sky-500 hover:text-white transition"
        >
          Cancel
        </button>

        {/* Button 2 */}
        <button
          disabled={loading}
          onClick={createCourseHandler}
          className="px-5 py-2 bg-sky-400 text-white rounded-md font-semibold hover:bg-sky-600 transition"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-1 h-4 w-4" />
              Please wait
            </>
          ) : (
            "Create"
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateCourse;
