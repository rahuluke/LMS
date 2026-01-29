import React from "react";

const Button = ({ title, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-md font-semibold transition 
        bg-zinc-100 text-black hover:bg-sky-600 hover:text-white 
        ${className}`}
    >
      {title}
    </button>
  );
};

export default Button;
