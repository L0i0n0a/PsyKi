import React from "react";

const Button = ({ text, onClick, type = "button", variant = "primary" }: {text: string, onClick?: () => void, type?: "button",  variant?: "primary" | "secondary" | "outline" }) => {
  const baseStyles = "px-6 py-2 rounded-full font-semibold transition duration-300 hover:cursor-pointer";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
    >
        {text}
    </button>
  );
};

export default Button;
