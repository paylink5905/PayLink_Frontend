import React from "react";

const InputField = ({ type, placeholder }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 outline-none focus:border-zinc-600"
    />
  );
};

export default InputField;