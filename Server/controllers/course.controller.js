import { Course } from "../models/course.model.js";
import cloudinary from "../utils/Cloudinary.js ";
import getDataUri from "../utils/dataUri.js";
import { Lecture } from "../models/lecture.model.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    console.log(courseTitle, category);
    if (!courseTitle || !category) {
      return res.status(400).json({
        message: "Courese title and category is required",
        success: false,
      });
    }
    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });
    return res.status(201).json({
      success: true,
      course,
      message: "Course Create Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create coures",
      success: false,
    });
  }
};

export const getPublishedCourse = async (_, res) => {
  try {
    const courses = await Course.find({ isPublished: true });
    if (!courses) {
      return res.status(404).json({
        message: "Courese not found",
      });
    }
    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get coures",
      success: false,
    });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId })
      .sort({
        createdAt: -1,
      })
      .populate("lectures");
    if (!courses) {
      return res.status(404).json({
        message: "Course not found",
        courses: [],
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get coures",
      success: false,
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    const file = req.file;

    let course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({
        message: "Course not Found",
      });
    }
    let courseThumbnail;
    if (file) {
      const fileUri = getDataUri(file);
      courseThumbnail = await cloudinary.uploader.upload(fileUri);
    }
    const updateData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: courseThumbnail?.secure_url,
    };
    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      course,
      message: "Course updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get coures",
      success: false,
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not Found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get coures",
      success: false,
    });
  }
};

// export const createLecture = async (req, res) => {
//   try {
//     const { lectureTitle } = req.body;
//     const { courseId } = req.params;

//     if (!lectureTitle || !courseId) {
//       return res.status(400).json({
//         message: "Lecture title is required",
//       });
//     }
//     const lecture = await Lecture.create({ lectureTitle });
//     const course = await Course.findById(courseId);
//     // if (course) {
//     //   await Course.updateOne(
//     //     { _id: courseId },
//     //     { $push: { lectures: lecture._id } },
//     //   );
//     // }
//     // / for New Lecture is not seting in for new persion
//     // const course = await Course.findById(courseId);
//     if (course) {
//       course.lectures.push(lecture._id);
//       await course.save();
//     }
//     return res.status(201).json({
//       success: true,
//       lecture,
//       message: "lecture created Successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Failed to Create Lecture",
//       success: false,
//     });
//   }
// };

// export const createLecture = async (req, res) => {
//   try {
//     const { lectureTitle } = req.body;
//     const { courseId } = req.params;

//     if (!lectureTitle) {
//       return res.status(400).json({ message: "Lecture title is required" });
//     }

//     const lecture = await Lecture.create({ lectureTitle });

//     // push lecture into course
//     await Course.findByIdAndUpdate(
//       courseId,
//       { $push: { lectures: lecture._id } },
//       { new: true },
//     );

//     res.status(201).json({
//       success: true,
//       lecture,
//       message: "Lecture created successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false });
//   }
// };

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle) {
      return res.status(400).json({
        success: false,
        message: "Lecture title is required",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const lecture = await Lecture.create({ lectureTitle });

    course.lectures.push(lecture._id);
    await course.save();

    return res.status(201).json({
      success: true,
      lecture,
      message: "Lecture created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create lecture",
    });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "course not found",
      });
    }
    return res.status(200).json({
      success: true,
      lectures: course.lectures,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get Lectures",
      success: false,
    });
  }
};

// export const editLecture = async (req, res) => {
//   try {
//   const { lectureTitle, videoUrl, publicId, isPreviewFree } = req.body;
//   const { courseId, lectureId } = req.params;

//     const lecture = await Lecture.findById(lectureId);
//     if (!lecture) {
//       return res.status(404).json({
//         message: "Lecture not found",
//       });
//     }
//     // update lecture
//     if (lectureTitle) lecture.lectureTitle = lectureTitle;
//     if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
//     if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
//     lecture.isPreviewFree = isPreviewFree;

//     await lecture.save();

//     const course = await Course.findById(courseId);
//     if (course && !course.lectures.includes(lecture._id)) {
//       course.lectures.push(lecture._id);
//       await course.save();
//     }
//     return res.status(200).json({
//       success: true,
//       lecture,
//       message: "Lecture update successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Failed to edit lectures",
//       success: false,
//     });
//   }
// };

// export const editLecture = async (req, res) => {
//   try {
//     console.log("PARAMS 👉", req.params);
//     console.log("BODY 👉", req.body);
//     const { courseId, lectureId } = req.params;
//     const { lectureTitle, videoInfo, isPreviewFree } = req.body; // <-- important

//     const lecture = await Lecture.findById(lectureId);
//     if (!lecture) return res.status(404).json({ message: "Lecture not found" });

//     if (lectureTitle) lecture.lectureTitle = lectureTitle;
//     if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
//     if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
//     lecture.isPreviewFree = isPreviewFree;

//     await lecture.save();

//     const course = await Course.findById(courseId);
//     if (course && !course.lectures.includes(lecture._id)) {
//       course.lectures.push(lecture._id);
//       await course.save();
//     }

//     res
//       .status(200)
//       .json({ success: true, lecture, message: "Lecture updated" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false });
//   }
// };

export const editLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const { lectureTitle, videoUrl, publicId, isPreviewFree } = req.body;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }

    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (videoUrl) lecture.videoUrl = videoUrl;
    if (publicId) lecture.publicId = publicId;
    if (typeof isPreviewFree === "boolean") {
      lecture.isPreviewFree = isPreviewFree;
    }

    await lecture.save();

    return res.status(200).json({
      success: true,
      lecture,
      message: "Lecture updated successfully",
    });
  } catch (error) {
    console.log("EDIT LECTURE ERROR 👉", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export const removeLecture = async (req, res) => {
//   try {
//     const { lectureId } = req.params;
//     const lecture = await Lecture.findByIdAndDelete(lectureId);
//     if (!lecture) {
//       return res.status(404).json({
//         message: "Lecture not found",
//       });
//     }
//     // Remove the lecture refference from the associatied course
//     await Course.updateOne(
//       { lectures: lectureId },
//       {
//         $null: { lecture: lectureId },
//       },
//     );
//     return res.status(200).json({
//       success: true,
//       message: "Lecture removed Successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Failed to remove lectures",
//     });
//   }
// };

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) return res.status(404).json({ message: "Lecture not found" });

    // Remove lecture reference from course
    await Course.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } },
    );

    return res
      .status(200)
      .json({ success: true, message: "Lecture removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to remove lecture" });
  }
};

export const togglePublishedCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }
    course.isPublished = !course.isPublished;
    await course.save();

    const statusMessage = course.isPublished ? "Published" : "Unpublised";
    return res.status(200).json({
      success: true,
      message: `Course is ${statusMessage}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update status",
    });
  }
};
