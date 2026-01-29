// import React, { useState } from "react";
// import { useEffect } from "react";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { setLecture } from "../../redux/lectureSlice";
// import { Loader2 } from "lucide-react";

// const LectureTab = () => {
//   const params = useParams();
//   const { courseId, lectureId } = params;
//   const { lecture } = useSelector((store) => store.lecture);
//   const selectedLecture = lecture.find((lecture) => lecture._id === lectureId);
//   // const selectedLecture = lecture?.find((l) => l._id === lectureId);
//   // const [lectureTitle, setLectureTitle] = useState(
//   //   selectedLecture.lectureTitle,
//   // );
//   const [lectureTitle, setLectureTitle] = useState("");
//   const [isFree, setIsFree] = useState(false);
//   const [uploadVideoInfo, setUploadVideoInfo] = useState(null);

//   const [mediaProgress, setMediaProgress] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [removeLoading, setRemoveLoading] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (selectedLecture) {
//       setLectureTitle(selectedLecture.lectureTitle);
//       setIsFree(selectedLecture.isPreviewFree);
//     }
//   }, [selectedLecture]);

//   const fileChangeHandler = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append("file", file);
//       setMediaProgress(true);
//       try {
//         const res = await axios.post(
//           `http://localhost:8000/api/v1/media/upload-video`,
//           formData,
//           {
//             onUploadProgress: ({ loaded, total }) => {
//               setUploadProgress(Math.round((loaded * 100) / total));
//             },
//           },
//         );
//         if (res.data.success) {
//           setUploadVideoInfo({
//             videoUrl: res.data.data.url,
//             publicId: res.data.data.public_id,
//           });
//           toast.success(res.data.message);
//         }
//       } catch (error) {
//         console.log(error);
//         toast.error("Video uplaod Failed");
//       } finally {
//         setMediaProgress(false);
//       }
//     }
//   };

//   const editLectureHandler = async (e) => {
//     e.preventDefault();
//     const data = {
//       lectureTitle,
//       videoInfo: uploadVideoInfo,
//       isPreviewFree: isFree,
//     };
//     try {
//       setLoading(true);
//       const res = await axios.post(
//         `http://localhost:8000/api/v1/course/${courseId}/lecture/${lectureId}`,
//         data,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         },
//       );
//       if (res.data.success) {
//         dispatch([...lecture, setLecture(res.data.lecture)]);
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to edit lecture");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const removeLectureHandler = async (e) => {
//     e.preventDefault();
//     try {
//       setRemoveLoading(true);
//       const res = await axios.delete(
//         `http://localhost:8000/api/v1/course/lecture/${lectureId}`,
//         { withCredentials: true },
//       );
//       if (res.data.success) {
//         navigate(`/admin/course/${courseId}/lecture`);
//         toast.success(res.data.message);
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("failed to delete lecture");
//     } finally {
//       setRemoveLoading(false);
//     }
//   };

//   // if (!selectedLecture) {
//   //   return <div>Loading lecture...</div>;
//   // }
//   return (
//     <div className="bg-white p-10 rounded-lg">
//       <div className="mb-5">
//         <h1 className="text-4xl font-bold mb-2">Edit Lecture</h1>
//         <p className="text-gray-500">
//           Update lecture details, video content, and access settings.
//         </p>
//       </div>

//       <div className="mb-8">
//         <button
//           disabled={removeLoading}
//           variant="destructive"
//           onClick={removeLectureHandler}
//           className="px-5 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700"
//         >
//           {removeLoading ? (
//             <>
//               <Loader2 className="mt-1 w-4 h-4 animate-spin" />
//               Please wait
//             </>
//           ) : (
//             "Remove Lecture"
//           )}
//         </button>
//       </div>

//       <div className="mb-6">
//         <h1 className="font-semibold mb-2">Title</h1>
//         <input
//           value={lectureTitle}
//           onChange={(e) => setLectureTitle(e.target.value)}
//           type="text"
//           placeholder="Enter lecture title"
//           className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none"
//         />
//       </div>

//       <div className="mb-6">
//         <h1 className="font-semibold mb-2">Video</h1>
//         <input
//           type="file"
//           accept="Video/*"
//           onChange={fileChangeHandler}
//           required
//           className="w-1/2 px-4 py-2 border border-gray-300 rounded-md bg-white"
//         />
//       </div>

//       {/* <div className="flex items-center gap-4 mb-10">
//         <h1 className="font-semibold">Is this video free</h1>
//         <label className="relative inline-flex items-center cursor-pointer">
//           <input type="checkbox" className="sr-only peer" />
//           <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-sky-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
//         </label>
//       </div> */}
//       <button
//         disabled={loading}
//         onClick={editLectureHandler}
//         className="px-6 py-3 bg-sky-600 text-white rounded-md font-semibold hover:bg-sky-700"
//       >
//         {loading ? (
//           <>
//             <Loader2 className="mr-1 w-4 h-4 animate-spin" />
//             Please wait
//           </>
//         ) : (
//           "Update Lecture"
//         )}
//       </button>
//     </div>
//   );
// };

// export default LectureTab;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { setLecture } from "../../redux/lectureSlice";
// import { Loader2 } from "lucide-react";

const LectureTab = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { lecture } = useSelector((store) => store.lecture);
  const [lectureTitle, setLectureTitle] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);

  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);

  // Populate default values when lectures change
  useEffect(() => {
    if (lecture.length > 0) {
      setLectureTitle(lecture[0].lectureTitle);
      setIsFree(lecture[0].isPreviewFree);
    }
  }, [lecture]);

  // File upload handler
  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setMediaProgress(true);

    try {
      const res = await axios.post(
        "https://lms-o0og.onrender.com/api/v1/media/upload-video",
        formData,
        {
          onUploadProgress: ({ loaded, total }) =>
            setUploadProgress(Math.round((loaded * 100) / total)),
        },
      );

      if (res.data.success) {
        setUploadVideoInfo({
          videoUrl: res.data.data.url,
          publicId: res.data.data.public_id,
        });
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Video upload failed");
    } finally {
      setMediaProgress(false);
    }
  };

  // Edit lecture
  const editLectureHandler = async (e, lectureItem) => {
    e.preventDefault();
    if (!lectureItem || !lectureItem._id)
      return toast.error("Lecture ID missing");

    const data = {
      lectureTitle,
      videoUrl: uploadVideoInfo?.videoUrl,
      publicId: uploadVideoInfo?.publicId,
      isPreviewFree: isFree,
    };

    try {
      setLoading(true);
      const res = await axios.put(
        `https://lms-o0og.onrender.com/api/v1/course/${courseId}/lecture/${lectureItem._id}`,
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        // Replace updated lecture in Redux array
        const updatedLectures = lecture.map((l) =>
          l._id === lectureItem._id ? res.data.lecture : l,
        );
        dispatch(setLecture(updatedLectures));

        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to edit lecture");
    } finally {
      setLoading(false);
    }
  };

  // Remove lecture
  const removeLectureHandler = async (lectureItem) => {
    if (!lectureItem || !lectureItem._id)
      return toast.error("Lecture ID missing");

    try {
      setRemoveLoading(true);
      const res = await axios.delete(
        `https://lms-o0og.onrender.com/api/v1/course/lecture/${lectureItem._id}`,
        { withCredentials: true },
      );

      if (res.data.success) {
        const updatedLectures = lecture.filter(
          (l) => l._id !== lectureItem._id,
        );
        dispatch(setLecture(updatedLectures));
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove lecture");
    } finally {
      setRemoveLoading(false);
    }
  };

  return (
    <div className="bg-white p-10 rounded-lg">
      <h1 className="text-4xl font-bold mb-2">Edit Lectures</h1>
      <p className="text-gray-500 mb-5">
        Update lecture details, video content, and access settings.
      </p>

      {lecture.map((lectureItem) => (
        <div key={lectureItem._id} className="mb-8 border-b pb-4">
          <div className="mb-4">
            <label className="font-semibold mb-1 block">Title</label>
            <input
              type="text"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              placeholder="Enter lecture title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="font-semibold mb-1 block">Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={fileChangeHandler}
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md bg-white"
            />
            {mediaProgress && <p>Uploading: {uploadProgress}%</p>}
          </div>

          <div className="flex items-center gap-4 mb-4">
            <label className="font-semibold">Is this video free?</label>
            <input
              type="checkbox"
              checked={isFree}
              onChange={(e) => setIsFree(e.target.checked)}
            />
          </div>

          <div className="flex gap-4">
            <button
              disabled={loading}
              onClick={(e) => editLectureHandler(e, lectureItem)}
              className="px-6 py-3 bg-sky-600 text-white rounded-md font-semibold hover:bg-sky-700"
            >
              {loading ? "Please wait" : "Update Lecture"}
            </button>

            <button
              disabled={removeLoading}
              onClick={() => removeLectureHandler(lectureItem)}
              className="px-5 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700"
            >
              {removeLoading ? "Please wait" : "Remove Lecture"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LectureTab;
