import React, { useState } from "react";
import Image from "next/image";

interface InputFieldProps {
  label: string;
  type?: "text" | "password" | "email" | "search" | "number" | "textarea" | "tel" | "url" | "date" | "time" | "datetime-local";
  name: string;
  value: any;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  name,
  value,
  placeholder,
  required = false,
  disabled,
  onChange,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mt-2">
      <label className="block text-base font-medium" htmlFor={name}>
        {label}
        {required && <span className="text-red-500">&nbsp;*</span>}
      </label>
      <div className="relative mt-2">
        {type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            value={value}
            required={required}
            readOnly={disabled}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-4 h-28 text-sm border border-black-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent ${disabled ? "bg-gray-200 text-gray-500 cursor-not-allowed" : ""} ${className}`}
          />
        ) : (
          <input
            type={type === "password" ? (showPassword ? "text" : "password") : type}
            id={name}
            name={name}
            value={value}
            required={required}
            readOnly={disabled}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-4 py-[.8rem] text-sm border border-black-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent ${disabled ? "bg-gray-200 text-gray-500 cursor-not-allowed" : ""} ${className}`}
          />
        )}

        {type === "password" && (
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={handleTogglePassword}
          >
            <Image
              src={showPassword ? "/svgs/eye.svg" : "/svgs/eye-hide.svg"}
              alt={showPassword ? "Hide Password" : "Show Password"}
              width={24}
              height={24}
              className="h-6 w-6"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;