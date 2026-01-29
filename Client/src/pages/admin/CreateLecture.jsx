import { Loader2, NotebookPen } from "lucide-react";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLecture } from "../../redux/lectureSlice";

const CreateLecture = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [lectureTitle, setLectureTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { lecture } = useSelector((store) => store.lecture);

  const createLectureHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `https://lms-o0og.onrender.com/api/v1/course/${params?.courseId}/lecture`,
        { lectureTitle },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setLectureTitle("");
    }
  };

  useEffect(() => {
    const getLectures = async () => {
      try {
        const res = await axios.get(
          `https://lms-o0og.onrender.com/api/v1/course/${params.courseId}/lecture`,
          {
            withCredentials: true,
          },
        );
        if (res.data.success) {
          dispatch(setLecture(res.data.lectures));
          // dispatch(setLecture(res.data.lecture));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getLectures();
  }, [lecture]);

  return (
    <div className="mt-20 w-full px-6">
      <div className="w-full p-8">
        <h2 className="text-5xl font-bold mb-2">
          Let’s add <span className="text-sky-500">lecture</span>
        </h2>
        <p className="text-sm text-gray-600 mb-10">
          Add a new lecture to your course by providing the lecture title below.
        </p>

        <h4 className="text-xl font-medium mb-2">Title</h4>
        <input
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
          type="text"
          placeholder="Enter lecture title"
          className="w-full px-4 py-4 mb-6 border border-gray-300 rounded-md bg-white focus:outline-none"
        />

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => navigate(`/admin/course/${params.courseId}`)}
            className="bg-red-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-600"
          >
            Back to Course
          </button>
          <button
            disabled={loading}
            onClick={createLectureHandler}
            className="bg-black text-white px-6 py-3 rounded-md font-semibold hover:text-white"
          >
            {loading ? (
              <>
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              " Create Lecture"
            )}
          </button>
        </div>

        <div className="mt-10">
          {lecture?.length > 0 ? (
            lecture.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#f7f9fA] px-4 py-2 rounded-md my-2"
              >
                <h1 className="font-bold text-gray-800">
                  Lecture - {index + 1} :{" "}
                  <span className="font-normal">{item.lectureTitle}</span>
                </h1>
                <NotebookPen
                  onClick={() => navigate(`${lecture._id}`)}
                  size={20}
                  className="cursor-pointer text-gray-600 hover:text-sky-600"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No lectures found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
