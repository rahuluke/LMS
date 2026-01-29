import React from "react";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";

const login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      const response = await axios.post("https://lms-o0og.onrender.com/api/v1/user/login", input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.data.success) {
        navigate("/");
        dispatch(setUser(response.data.user));
        toast.success(response.data.message || "Success!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Please login to your Account
        </p>

        <form className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              onChange={handleChange}
              name="email"
              value={input.email}
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              onChange={handleChange}
              name="password"
              value={input.password}
              type="password"
              placeholder="Create a password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
          <div className="text-center mt-10 ">
            <Button onClick={handleSubmit} title="Login" />
          </div>
          <hr />
          <p className="text-center text-sm mt-10 gap-1">
            Don't have an account?
            <Link to="/login">
              <span className="text-sky-500 cursor-pointer font-semibold">
                Sign up
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default login;
