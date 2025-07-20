import React from "react";
import { format } from "date-fns";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const DealCard = ({ deal, onViewDetails, onToggleFavorite, isFavorite }) => {
const getFreshnessInfo = (lastUpdated) => {
    const now = new Date();
    const updated = new Date(lastUpdated);
    const hoursAgo = Math.floor((now - updated) / (1000 * 60 * 60));
    
    if (hoursAgo < 2) {
      return { text: "Live", class: "freshness-fresh" };
    } else if (hoursAgo < 12) {
      return { text: `${hoursAgo}h ago`, class: "freshness-fresh" };
    } else if (hoursAgo < 48) {
      const daysAgo = Math.floor(hoursAgo / 24);
      return { text: daysAgo === 1 ? "Yesterday" : `${daysAgo}d ago`, class: "freshness-moderate" };
    } else {
      const daysAgo = Math.floor(hoursAgo / 24);
      return { text: `${daysAgo}d ago`, class: "freshness-stale" };
    }
  };

  const freshness = getFreshnessInfo(deal.lastUpdated);

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
    <div className="card p-6 relative group">
      <button
        onClick={() => onToggleFavorite(deal.Id)}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-150"
      >
        <ApperIcon 
          name={isFavorite ? "Heart" : "Heart"} 
          className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} 
        />
      </button>

      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 pr-8 leading-tight">
          {deal.title}
        </h3>
        <Badge variant="accent" className="deal-badge shrink-0">
          {deal.discountType === "percentage" ? `${deal.discountValue}% OFF` : `$${deal.discountValue} OFF`}
        </Badge>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {deal.description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <ApperIcon name={getCategoryIcon(deal.productCategory)} className="w-4 h-4 text-secondary" />
          <Badge variant="secondary" className="category-pill text-xs">
            {deal.productCategory}
          </Badge>
        </div>
        <div className={`freshness-indicator ${freshness.class}`}>
          {freshness.text}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-600">
            <ApperIcon name="MapPin" className="w-4 h-4 inline mr-1" />
            {deal.dispensary?.name}
          </div>
          <div className="text-xs text-gray-500">
            Valid until {format(new Date(deal.validUntil), "MMM d")}
          </div>
        </div>
        
        <Button 
          onClick={() => onViewDetails(deal)}
          className="w-full"
          size="sm"
        >
          View Details
          <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default DealCard;