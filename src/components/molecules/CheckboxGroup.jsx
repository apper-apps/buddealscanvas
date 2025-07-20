import React from "react";

const CheckboxGroup = ({ options, selectedValues, onChange }) => {
  const handleChange = (value) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter(v => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option.value} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors duration-150">
          <input
            type="checkbox"
            checked={selectedValues.includes(option.value)}
            onChange={() => handleChange(option.value)}
            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
          />
          <span className="text-sm text-gray-700 flex-1">{option.label}</span>
          {option.count && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {option.count}
            </span>
          )}
        </label>
      ))}
    </div>
  );
};

export default CheckboxGroup;