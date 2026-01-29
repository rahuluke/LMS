// import React from "react";
// import Hero from "../components/Hero";
// import CourseCard from "../components/CourseCard";
// import { useSelector } from "react-redux";

// const Home = () => {
//   const { course } = useSelector((store) => store.course);
//   return (
//     <div>
//       <Hero />
//       <div className="pt-10">
//         <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
//           Our Courses
//         </h1>
//         <p className="text-center text-gray-700 mb-12 ">
//           Learn industry-relevant skills with expert-designed courses, hands-on
//           projects, and practical guidance.
//         </p>
//         <div className="max-w-7xl mx-auto px-4 py-8 ">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {course.map((course, index) => {
//               return <CourseCard course={course} key={index} />;
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import Hero from "../components/Hero";
import CourseCard from "../components/CourseCard";
import { useSelector } from "react-redux";

const Home = () => {
  const { course } = useSelector((store) => store.course);

  return (
    <div>
      <Hero />
      <div className="pt-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Our Courses
        </h1>
        <p className="text-center text-gray-700 mb-12 ">
          Learn industry-relevant skills with expert-designed courses, hands-on
          projects, and practical guidance.
        </p>
        <div className="max-w-7xl mx-auto px-4 py-8 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(course) &&
              course.map((course, index) => (
                <CourseCard course={course} key={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
