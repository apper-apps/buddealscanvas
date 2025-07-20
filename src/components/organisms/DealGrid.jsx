import React from "react";
import DealCard from "@/components/molecules/DealCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const DealGrid = ({ 
  deals, 
  loading, 
  error, 
  onRetry, 
  onViewDetails, 
  onToggleFavorite,
  favoriteDeals,
  onClearFilters 
}) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (!deals || deals.length === 0) {
    return (
      <Empty
        title="No deals found"
        description="Try adjusting your search or filters to discover more deals"
        actionText="Clear Filters"
        onAction={onClearFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {deals.map((deal) => (
        <DealCard
          key={deal.Id}
          deal={deal}
          onViewDetails={onViewDetails}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favoriteDeals.includes(deal.Id)}
        />
      ))}
    </div>
  );
};

export default DealGrid;