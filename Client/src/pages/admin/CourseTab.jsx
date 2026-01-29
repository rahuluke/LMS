import React, { useEffect, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import RichTextEditor from "../../components/RichTextEditor";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setCourse } from "../../redux/courseSlice";

const CourseTab = () => {
  const params = useParams();
  const id = params.courseId;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { course } = useSelector((store) => store.course);
  const selectCourse = course.find((course) => course._id === id);

  const [selectedCourse, setSelectedCourse] = useState(selectCourse);
  const [loading, setLoading] = useState(false);
  const [publish, setPublish] = useState(false);

  const getCourseById = async () => {
    try {
      const res = await axios.get(
        `https://lms-o0og.onrender.com/api/v1/course/${id}`,
        {
          withCredentials: true,
        },
      );
      if (res.data.success) {
        {
          setSelectedCourse;
          res.data.course;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCourseById();
  });

  const [input, setInput] = useState({
    courseTitle: selectedCourse?.courseTitle,
    subTitle: selectedCourse?.subTitle,
    description: selectedCourse?.description,
    category: selectedCourse?.category,
    courseLevel: selectedCourse?.courseLevel,
    coursePrice: selectedCourse?.coursePrice,
    file: "",
  });

  const [previewThumbnail, setPreviewThumbnail] = useState(
    selectedCourse?.courseThumbnail,
  );

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("file", input.courseThumbnail);
    try {
      setLoading(true);
      const res = await axios.put(
        `https://lms-nswg.onrender.com/api/v1/course/${id}`,
        formData,
        {
          headers: {
            "Content-Types": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        navigate(`lecture`);
        toast.success(res.data.message);
        dispatch([...course], setCourse(res.data.course));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const togglePublishUnpublish = async (action) => {
    try {
      const res = await axios.patch(
        `https://lms-nswg.onrender.com/api/v1/course/${id}`,
        {
          params: {
            action,
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        setPublish(!publish);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="bg-white rounded-xl min-h-screen shadow p-6">
        {/* ===== Header ===== */}
        <div className="flex items-start justify-between border-b pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Basic Course Information
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Update your course details and manage its visibility
            </p>
          </div>

          <div className="flex gap-3 font-semibold">
            <button
              onClick={() =>
                togglePublishUnpublish(
                  selectCourse.isPublished ? "false" : "true",
                )
              }
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              {selectCourse.isPublished ? "UnPublish" : "Publish"}
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
              Remove Course
            </button>
          </div>
        </div>

        {/* ===== Course Inputs ===== */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-semibold text-gray-850 mb-1">
              Course Title
            </label>
            <input
              value={input.courseTitle}
              onChange={changeEventHandler}
              name="courseTitle"
              type="text"
              placeholder="Enter course title"
              className="w-full border rounded-md px-4 py-2 "
            />
          </div>

          {/* subTitle */}
          <div>
            <label className="block font-semibold text-gray-850 mb-1">
              subTitle
            </label>
            <input
              value={input.subTitle}
              onChange={changeEventHandler}
              name="subTitle"
              type="text"
              placeholder="Short course subTitle"
              className="w-full border rounded-md px-4 py-2 "
            />
          </div>

          {/* Description with editor */}
          <div>
            <label className="block font-semibold text-gray-850 mb-2">
              Description
            </label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category */}
            <div>
              <label className="block font-semibold text-gray-850 mb-1">
                Category
              </label>
              <select
                defaultValue={input.category}
                // onValueChange={selectCategory}
                value={input.category}
                onChange={(e) => selectCategory(e.target.value)}
                className="w-full border rounded-md px-4 py-2 focus:outline-none"
              >
                <option>Select category</option>
                <option>JavaScript</option>
                <option>React</option>
                <option>Node.js</option>
                <option>Python</option>
              </select>
            </div>

            {/* Level */}
            <div>
              <label className="block font-semibold text-gray-850 mb-1">
                Course Level
              </label>
              <select
                defaultValue={input.courseLevel}
                onValueChange={selectCourseLevel}
                className="w-full border rounded-md px-4 py-2 focus:outline-none"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block font-semibold text-gray-850 mb-1">
                Price
              </label>
              <input
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                type="number"
                placeholder="₹"
                className="w-full border rounded-md px-4 py-2 focus:outline-none"
              />
            </div>
          </div>

          {/* ===== Thumbnail Upload ===== */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Course Thumbnail
            </label>

            <div className="flex items-center gap-6">
              <label htmlFor="file" className="cursor-pointer">
                <img
                  src={
                    previewThumbnail
                      ? previewThumbnail
                      : "https://via.placeholder.com/300x180?text=Course+Image"
                  }
                  alt="thumbnail"
                  className="w-60 h-40 object-cover rounded-lg border hover:opacity-80 transition"
                />
              </label>

              {/* Upload Button */}
              <label
                htmlFor="file"
                className="flex items-center gap-2 px-5 py-2 bg-sky-500 text-white rounded-md cursor-pointer hover:bg-sky-600 transition"
              >
                Upload Image
              </label>

              {/* Hidden file input */}
              <input
                onChange={selectThumbnail}
                type="file"
                id="file"
                accept="image/*"
                hidden
              />
            </div>
          </div>

          {/* ===== Save Button ===== */}
          <div className="pt-4 flex gap-7">
            <button
              onClick={() => navigate("/admin/course")}
              className="px-6 font-semibold py-2 bg-black text-white rounded-md border "
            >
              Cancle
            </button>
            <button
              disabled={loading}
              onClick={updateCourseHandler}
              className="px-6 font-semibold py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseTab;
