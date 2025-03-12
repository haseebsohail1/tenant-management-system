import React, { useState } from "react";
import Button from "../Button/Button";
import InputField from "@/components/InputField";
interface User {
  [key: string]: string;
}

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newUser: User) => void;
  headingText: string;
  inputLabels: { [key: string]: string };
}

const ModalComponent: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onSave,
  headingText,
  inputLabels,
}) => {
  const [newUser, setNewUser] = useState<User>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(newUser);
    onClose();
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
              {Object.entries(inputLabels).map(([key, label]) => (
                <div key={key}>
                  <InputField
                    label={label}
                    name={key}
                    required={true}
                    type="text"
                    placeholder={label}
                    onChange={handleChange}
                    value={newUser[key] || ""}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-700 px-4 py-3 flex gap-4 flex-row justify-end">
            <Button
              type="button"
              className="rounded-md shadow-sm px-6 py-2 bg-gray-600 font-medium text-gray-700 hover:bg-gray-500  focus:none text-white"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="rounded-md shadow-sm px-8 py-2 bg-indigo-800 text-white font-medium focus:none"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
