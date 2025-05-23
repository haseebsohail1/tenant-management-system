import React, { useState, useEffect } from "react";
import Button from "../Button/Button"; // Update the import path
import InputField from "@/components/InputField"; // Update the import path

interface FormData {
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

interface EditModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedData: FormData) => void;
  headingText: string;
  inputLabels: { [key: string]: InputFieldProps };
  loading?: boolean;
  selectLabels: {
    [key: string]: {
      label: string;
      options: string[] | { label: string; value: string }[];
    };
  };
  initialData?: FormData | null;
}

const EditModalComponent: React.FC<EditModalComponentProps> = ({
  isOpen,
  onClose,
  onUpdate,
  headingText,
  inputLabels,
  loading,
  selectLabels = {},
  initialData,
}) => {
  const [formData, setFormData] = useState<FormData>({});

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData(initialData);
    }
  }, [isOpen, initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onUpdate(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-gray-900 opacity-75"></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          ​
        </span>
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
                    <option value="" disabled>
                      Select {label}
                    </option>
                    {options.map((option: any, index: number) => (
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
                <InputField
                  key={key}
                  label={label}
                  name={key}
                  required={false}
                  type={type}
                  placeholder={label}
                  onChange={handleChange}
                  value={formData[key] || ""}
                />
              ))}
            </div>
          </div>
          <div className="bg-gray-700 px-4 py-3 flex justify-end gap-4">
            <Button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 bg-gray-600 text-white hover:bg-gray-500 rounded-md"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-2 bg-yellow-600 text-white hover:bg-yellow-700 rounded-md"
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModalComponent;
