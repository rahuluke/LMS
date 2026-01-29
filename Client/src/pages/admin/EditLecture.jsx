import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";

const EditLecture = () => {
  const params = useParams();
  const courseId = params.courseId;
  // const { courseId, lectureId } = useParams();
  // console.log(courseId);
  // console.log(lectureId);

  return (
    <div className="p-10 rounded-lg">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to={`/admin/course/${courseId}/lecture`}>
            <button className="h-10 w-10 rounded-full border flex items-center justify-center font-semibold">
              <ArrowLeft size={18} />
            </button>
          </Link>
          <h1 className="text-xl font-semibold">Update Lecture</h1>
        </div>
      </div>
      {/* <LectureTab /> */}
      <LectureTab />
    </div>
  );
};

export default EditLecture;
