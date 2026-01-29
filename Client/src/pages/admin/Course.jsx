import React, { useEffect } from "react";
import Button from "../../components/Button";
import { NotebookPen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../../redux/courseSlice";

// const courses = [
//   {
//     id: 1,
//     name: "React for Beginners",
//     image: "https://via.placeholder.com/60x60.png?text=Course",
//     price: "$49",
//     status: "Published",
//   },
//   {
//     id: 2,
//     name: "Advanced JavaScript",
//     image: "https://via.placeholder.com/60x60.png?text=JS",
//     price: "$79",
//     status: "Published",
//   },
//   {
//     id: 1,
//     name: "React for Beginners",
//     image: "https://via.placeholder.com/60x60.png?text=React",
//     price: "$49",
//     status: "Published",
//   },
//   {
//     id: 2,
//     name: "Advanced JavaScript",
//     image: "https://via.placeholder.com/60x60.png?text=JS",
//     price: "$79",
//     status: "Published",
//   },
// ];

const Course = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { course } = useSelector((store) => store.course);
  useEffect(() => {
    const getCreatorCourse = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/course/", {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setCourse(res.data.courses));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCreatorCourse();
  }, [dispatch]);
  return (
    <div className="md:p-10 p-4 w-full min-h-screen bg-gray-100">
      {/* Top Button */}
      <div className="mb-6">
        <Button
          onClick={() => navigate("create")}
          title="Create Course"
          className="bg-sky-400 text-black border-2  hover:bg-sky-600"
        />
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-4">Course</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {course?.map((course) => (
              <tr
                key={course._id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Course */}
                <td className="p-4 md:w-[300px] flex items-center gap-4">
                  <img
                    src={
                      course?.courseThumbnail ||
                      "https://via.placeholder.com/56x56?text=Course"
                    }
                    alt="Thumbnail"
                    className="w-30 h-20 rounded-lg object-cover"
                  />
                  <span className=" font-semibold text-gray-800">
                    {course.courseTitle}
                  </span>
                </td>

                {/* Price */}
                <td className="p-4 font-medium text-gray-700">
                  {course.coursePrice || "NA"}
                </td>

                {/* Status */}
                <td className="p-4">
                  <span
                    className={`text-white text-sm font-semibold px-4 py-2 rounded-full ${
                      course.isPublished ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {course.isPublished ? "Published" : "Draft"}
                  </span>
                </td>

                {/* Action */}
                <td className="p-4 text-center">
                  <button
                    className="text-black hover:text-sky-600 transition"
                    onClick={() => navigate(`/admin/course/${course._id}`)}
                  >
                    <NotebookPen size={25} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Course;
