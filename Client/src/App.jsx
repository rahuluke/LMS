import Navbar from "./components/Navbar";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Admin from "./pages/admin/Admin";
import Dashboard from "./pages/admin/Dashboard";
import Course from "./pages/admin/Course";
import CreateCourse from "./pages/admin/CreateCourse";
import UpdateCourse from "./pages/admin/UpdateCourse";
import CreateLecture from "./pages/admin/CreateLecture";
import EditLecture from "./pages/admin/EditLecture";
import CourseDetails from "./pages/CourseDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/courses",
    element: (
      <>
        <Navbar />
        <Courses />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Navbar />
        <Signup />
      </>
    ),
  },
  {
    path: "/profile",
    element: (
      <>
        <Navbar />
        <Profile />
      </>
    ),
  },
  {
    path: "/courses/:courseId",
    element: (
      <>
        <Navbar />
        <CourseDetails />
      </>
    ),
  },
  {
    path: "/admin",
    element: (
      <>
        <Navbar />
        <Admin />
      </>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "course",
        element: <Course />,
      },
      {
        path: "course/create",
        element: <CreateCourse />,
      },
      {
        path: "course/:courseId",
        element: <UpdateCourse />,
      },
      {
        path: "course/:courseId/lecture",
        element: <CreateLecture />,
      },
      {
        path: "course/:courseId/lecture/:lectureId",
        element: <EditLecture />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div className='font-["Satoshi-Variable"]'>
      <>
        <RouterProvider router={router} />
        <Footer />
      </>
    </div>
  );
};

export default App;
