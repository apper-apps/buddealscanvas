import React from "react";
import Label from "@/components/atoms/Label";
import ApperIcon from "@/components/ApperIcon";

const FilterGroup = ({ title, children, isExpanded, onToggle, icon }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-4 text-left hover:bg-gray-50 transition-colors duration-150"
      >
        <div className="flex items-center space-x-3">
          {icon && <ApperIcon name={icon} className="w-5 h-5 text-primary" />}
          <Label className="text-base font-semibold mb-0">{title}</Label>
        </div>
        <ApperIcon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          className="w-5 h-5 text-gray-500 transition-transform duration-200" 
        />
      </button>
      {isExpanded && (
        <div className="pb-4 space-y-3">
          {children}
        </div>
      )}
    </div>
  );
};

export default FilterGroup;