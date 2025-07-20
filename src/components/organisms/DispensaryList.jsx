import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const DispensaryList = ({ dispensaries, loading, error, onRetry, onVisitWebsite }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="card p-6 animate-pulse">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="ml-4">
                <div className="h-6 w-16 bg-gray-200 rounded-full mb-2"></div>
                <div className="h-9 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  return (
    <div className="space-y-4">
      {dispensaries.map((dispensary) => (
        <div key={dispensary.Id} className="card p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900">
                  {dispensary.name}
                </h3>
                <Badge variant="primary" className="ml-4">
                  {dispensary.activeDeals} active deals
                </Badge>
              </div>
              
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center">
                  <ApperIcon name="MapPin" className="w-4 h-4 mr-2 text-primary" />
                  <span>{dispensary.location}</span>
                </div>
                <div className="flex items-center">
                  <ApperIcon name="Navigation" className="w-4 h-4 mr-2 text-primary" />
                  <span>{dispensary.address}</span>
                </div>
                {dispensary.hours && (
                  <div className="flex items-center">
                    <ApperIcon name="Clock" className="w-4 h-4 mr-2 text-primary" />
                    <span>
                      {dispensary.hours.today} 
                      <span className="ml-2 text-sm text-gray-500">
                        (today)
                      </span>
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="ml-6 flex flex-col space-y-2">
              <Button
                size="sm"
                onClick={() => onVisitWebsite(dispensary.website)}
              >
                <ApperIcon name="ExternalLink" className="w-4 h-4 mr-2" />
                Visit Website
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DispensaryList;