import React from "react";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    (e.preventDefault(), console.log(user));
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (response.data.success) {
        navigate("/login");
        toast.success(response.data.message || "Success!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Create your Account
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Join us today! it's Quick and easy
        </p>

        <form className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Full Name</label>
            <input
              onChange={handleChange}
              value={user.name}
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              onChange={handleChange}
              value={user.email}
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              onChange={handleChange}
              value={user.password}
              name="password"
              password="password"
              type="password"
              placeholder="Create a password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Role</label>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="role"
                  value="student"
                  checked={user.role === "student"}
                  id="role1"
                  className="accent-sky-400"
                />
                <span>Student</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="role"
                  value="instructor"
                  checked={user.role === "instructor"}
                  id="role2"
                  className="accent-sky-400"
                />
                <span>Instructor</span>
              </label>
            </div>
          </div>

          <div className="text-center ">
            <Button onClick={handleSubmit} title="Sign Up" />
          </div>
          <p className="text-center text-sm mt-3">
            Already have an account?
            <Link to="/login">
              <span className="text-sky-500 cursor-pointer font-semibold">
                Login
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default signup;
