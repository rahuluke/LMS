import React from "react";

const Avatar = ({ name = "User", src }) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-sky-500 text-white flex items-center justify-center overflow-hidden text-sm font-semibold">
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : (
          initials
        )}
      </div>
    </div>
  );
};

export default Avatar;
