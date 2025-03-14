import React from "react";
import Button from "../Button/Button";

interface TableHeaderProps {
  title: string;
  description: string;
  onAdd?: () => void;
  onAddTitle?: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  title,
  description,
  onAdd,
  onAddTitle,
}) => {
  return (
    <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <p className="mt-1 max-w-2xl text-sm text-white">{description}</p>
      </div>
      <div>
        {onAdd && onAddTitle && (
          <Button
            onClick={onAdd}
            className="bg-indigo-800 text-white py-2 px-8 rounded-md"
          >
            {onAddTitle}
          </Button>
        )}
      </div>
    </div>
  );
};

export default TableHeader;
