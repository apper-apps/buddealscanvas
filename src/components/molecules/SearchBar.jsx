import React from "react";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const SearchBar = ({ value, onChange, placeholder = "Search deals, products, or brands..." }) => {
  return (
    <div className="relative">
      <ApperIcon 
        name="Search" 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-12 bg-white shadow-sm"
      />
    </div>
  );
};

export default SearchBar;