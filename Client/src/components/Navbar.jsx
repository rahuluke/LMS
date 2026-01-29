import React from "react";
import { GraduationCap } from "lucide-react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-hot-toast";
import Avatar from "./Avatar";
import axios from "axios";
import { setUser } from "../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  // const user = false;

  const logoutHandler = async (e) => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-sky-400 z-50 w-full fixed top-0 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/">
          <div className="flex gap-1 items-center">
            <GraduationCap className="w-20 h-20 font-thin" />
            <h1 className="text-2xl font-bold">Logo</h1>
          </div>
        </Link>
        <nav>
          <ul className="flex gap-7 text-xl items-center font-semibold">
            <Link to="/">
              <li className="cursor-pointer">Home</li>
            </Link>
            <Link to="/courses">
              <li className="cursor-pointer">Courses</li>
            </Link>
            {!user ? (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button className="hover:bg-sky-500" title={"Login"} />
                </Link>
                <Link to="/signup">
                  <Button className="hover:bg-sky-500" title={"Signup"} />
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-7">
                {user.role === "instructor" && (
                  <Link to="/admin/dashboard">
                    <li className="cursor-pointer">Admin</li>
                  </Link>
                )}
                <Link to="/profile">
                  <Avatar />
                </Link>
                <Button onClick={logoutHandler} title={"Logout"} />
              </div>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
