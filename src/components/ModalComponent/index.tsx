import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import InputField from "@/components/InputField";

interface User {
  [key: string]: string;
}

interface InputFieldProps {
  label: string;
  type?:
    | "text"
    | "number"
    | "email"
    | "password"
    | "tel"
    | "url"
    | "date"
    | "datetime-local"
    | "search"
    | "textarea"
    | "time";
}

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newUser: User) => void;
  headingText: string;
  inputLabels: { [key: string]: InputFieldProps };
  loading?: boolean;
  selectLabels: {
    [key: string]: {
      label: string;
      options: string[] | { label: string; value: string }[];
    };
  };
}

const ModalComponent: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onSave,
  headingText,
  inputLabels,
  loading,
  selectLabels = {},
}) => {
  const [formData, setFormData] = useState<User>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData);
    setFormData({});
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center w-full justify-center min-h-screen pt-4 px-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        ></span>

        <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-5 sm:align-middle lg:w-[700px] w-full">
          <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-3 sm:pb-4">
            <h3 className="text-lg leading-6 font-medium text-white">
              {headingText}
            </h3>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(selectLabels).map(([key, { label, options }]) => (
                <div key={key} className="flex flex-col justify-end">
                  <label className="block text-white mb-1">{label}</label>
                  <select
                    name={key}
                    value={formData[key] || ""}
                    onChange={handleChange}
                    className="text-sm rounded-md p-3 w-full bg-gray-700 text-white focus:outline-none focus:none"
                  >
                    <option value="">Select {label}</option>
                    {options.map((option: any) => (
                      <option
                        key={typeof option === "string" ? option : option.value}
                        value={
                          typeof option === "string" ? option : option.value
                        }
                      >
                        {typeof option === "string" ? option : option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              {Object.entries(inputLabels).map(([key, { label, type }]) => (
                <div key={key}>
                  <InputField
                    label={label}
                    name={key}
                    required={true}
                    type={type}
                    placeholder={label}
                    onChange={handleChange}
                    value={formData[key] || ""}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-700 px-4 py-3 flex gap-4 flex-row justify-end">
            <Button
              type="button"
              className="rounded-md shadow-sm px-6 py-2 bg-gray-600 font-medium text-gray-700 hover:bg-gray-500 focus:none text-white"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="rounded-md shadow-sm px-8 py-2 bg-yellow-600 text-white font-medium focus:none"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Processing.." : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
