import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No deals found", 
  description = "Try adjusting your filters or check back later for new deals",
  actionText = "Clear Filters",
  onAction 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="Leaf" className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{description}</p>
      {onAction && (
        <button onClick={onAction} className="btn-secondary">
          <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
          {actionText}
        </button>
      )}
    </div>
  );
};

export default Empty;