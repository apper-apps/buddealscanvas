import React from "react";
import { format } from "date-fns";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const DealModal = ({ deal, isOpen, onClose, onVisitWebsite }) => {
  if (!isOpen || !deal) return null;

  const getCategoryIcon = (category) => {
    const icons = {
      "flower": "Flower2",
      "edibles": "Cookie",
      "concentrates": "Droplets",
      "vapes": "Zap",
      "accessories": "Package"
    };
    return icons[category.toLowerCase()] || "Package";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {deal.title}
              </h2>
              <div className="flex items-center space-x-3">
                <Badge variant="accent" className="deal-badge">
                  {deal.discountType === "percentage" ? `${deal.discountValue}% OFF` : `$${deal.discountValue} OFF`}
                </Badge>
                <div className="flex items-center space-x-2">
                  <ApperIcon name={getCategoryIcon(deal.productCategory)} className="w-4 h-4 text-secondary" />
                  <Badge variant="secondary" className="category-pill">
                    {deal.productCategory}
                  </Badge>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-150"
            >
              <ApperIcon name="X" className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {deal.description}
            </p>
          </div>

          {deal.terms && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Terms & Conditions</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {deal.terms}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface p-4 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <ApperIcon name="MapPin" className="w-5 h-5 mr-2 text-primary" />
                Dispensary Info
              </h4>
              <div className="space-y-2 text-sm">
                <p className="font-medium">{deal.dispensary?.name}</p>
                <p className="text-gray-600">{deal.dispensary?.location}</p>
                <p className="text-gray-600">{deal.dispensary?.address}</p>
              </div>
            </div>

            <div className="bg-surface p-4 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <ApperIcon name="Calendar" className="w-5 h-5 mr-2 text-primary" />
                Valid Dates
              </h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">From:</span> {format(new Date(deal.validFrom), "MMM d, yyyy")}</p>
                <p><span className="font-medium">Until:</span> {format(new Date(deal.validUntil), "MMM d, yyyy")}</p>
                <p className="text-gray-600">
                  Last updated: {format(new Date(deal.lastUpdated), "MMM d, h:mm a")}
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button 
              onClick={() => onVisitWebsite(deal.sourceUrl)}
              className="flex-1"
            >
              <ApperIcon name="ExternalLink" className="w-5 h-5 mr-2" />
              Visit Dispensary Website
            </Button>
            <Button 
              variant="secondary"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealModal;