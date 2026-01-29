import React from "react";
import { NavLink } from "react-router-dom";
import { ChartColumnBig, FolderPlus } from "lucide-react";

export const Sidebar = () => {
  return (
    <div className="bg-gray-600 w-80 h-screen hidden md:block sticky top-0">
      <div className="pt-10 px-4 space-y-2">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl font-semibold text-white transition-all
             ${isActive ? "bg-gray-800" : "hover:bg-gray-800/60"}`
          }
        >
          <ChartColumnBig className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/course"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl font-semibold text-white transition-all
             ${isActive ? "bg-gray-800" : "hover:bg-gray-800/60"}`
          }
        >
          <FolderPlus className="w-5 h-5" />
          <span>Course</span>
        </NavLink>
      </div>
    </div>
  );
};
