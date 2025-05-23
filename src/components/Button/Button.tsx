import React from "react";
import Image from "next/image";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  iconSrc?: string;
  iconAlt?: string;
  iconSize?: number;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  className = "",
  iconSrc,
  iconAlt = "icon",
  iconSize = 24,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      className={`flex items-center justify-center space-x-2  ${className} ${
        disabled ? "bg-gray-400 text-gray-700 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
    >
      {iconSrc && (
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={iconSize}
          height={iconSize}
          className="inline-block"
        />
      )}
      <span>{children}</span>
    </button>
  );
};

export default Button;
