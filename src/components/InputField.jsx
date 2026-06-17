const InputField = ({ type, placeholder, className = "", ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full rounded-md border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none transition focus:border-zinc-500 ${className}`}
      {...props}
    />
  );
};

export default InputField;
