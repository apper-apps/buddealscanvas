import React from "react";

const Loading = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="card p-6 animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-8 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="flex justify-between items-center pt-2">
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;