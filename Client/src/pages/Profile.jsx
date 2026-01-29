import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="max-w-5xl mx-auto my-30 ">
      <div className="bg-white shadow-lg rounded-lg p-8 flex items-center gap-8">
        <div className="w-32 h-32 rounded-full border-2 border-black overflow-hidden flex-shrink-0">
          <img
            src="https://i.pravatar.cc/300"
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome, {user.name} 👋
          </h1>

          <p className="text-gray-700 text-lg font-bold mb-2">
            Name : <span className="font-medium"> {user.name}</span>
          </p>

          <p className="text-gray-600 mt-2 text-lg font-bold max-w-2xl">
            Role : <span className="font-medium"> {user.role}</span>
          </p>

          <button className="mt-4 px-6 py-2 text-sm font-semibold text-white bg-sky-500 rounded-md hover:bg-sky-600 transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
