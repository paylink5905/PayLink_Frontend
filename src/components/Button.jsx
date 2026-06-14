import React from "react";

const Button = ({ children, type = "button" }) => {
  return (
    <button
      type={type}
      className="w-full py-3 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 transition"
    >
      {children}
    </button>
  );
};

export default Button;