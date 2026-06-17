const Button = ({ children, type = "button", className = "", disabled = false, ...props }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full rounded-md bg-white py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
