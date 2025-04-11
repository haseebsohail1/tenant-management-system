import React, { useEffect, useState } from "react";

interface FileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { file?: File | null }) => void;
  loading?: boolean;
  document?: {
    name?: string;
  };
}

const FileModalComponent: React.FC<FileModalProps> = ({
  isOpen,
  onClose,
  onSave,
  document,
  loading,
}) => {
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFile(null);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    onSave({ file });
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
            <h2 className="text-lg leading-6 font-medium text-white mb-8">
              Upload Lease Document
            </h2>
            <div className="flex flex-col justify-center items-center">
              <label
                htmlFor="file-upload"
                className="block w-full lg:w-[400px] cursor-pointer text-center py-2 px-4 rounded bg-yellow-600 text-white hover:bg-yellow-700"
              >
                Select PDF File
              </label>
              <input
                id="file-upload"
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              {file && (
                <p className="text-sm text-white mt-1">
                  Selected file:{" "}
                  <span className="font-medium">{file.name}</span>
                </p>
              )}
            </div>
            <div className="bg-gray-700 px-4 py-3 flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-600 text-white hover:bg-gray-500 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-yellow-600 text-white hover:bg-yellow-700 rounded-md"
              >
                {loading ? "Uploading" : "Upload"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileModalComponent;
