import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import FilterSidebar from "@/components/organisms/FilterSidebar";
import DealGrid from "@/components/organisms/DealGrid";
import DealModal from "@/components/molecules/DealModal";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { dealService } from "@/services/api/dealService";
import { dispensaryService } from "@/services/api/dispensaryService";

const DealsPage = ({ searchQuery }) => {
  const [deals, setDeals] = useState([]);
  const [dispensaries, setDispensaries] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [favoriteDeals, setFavoriteDeals] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [sortBy, setSortBy] = useState("recency");
  
  const [filters, setFilters] = useState({
    dispensaries: [],
    categories: [],
    dealTypes: []
  });

  // Utility function to calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Get user's current location
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported"));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setUserLocation(location);
          resolve(location);
        },
        (error) => {
          console.error("Error getting location:", error);
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
      );
    });
  };

  // Extract discount percentage from deal description or title
  const extractDiscountPercentage = (deal) => {
    const text = `${deal.title} ${deal.description}`.toLowerCase();
    const percentMatch = text.match(/(\d+)%/);
    if (percentMatch) {
      return parseInt(percentMatch[1]);
    }
    
    // Look for dollar amount savings and estimate percentage
    const dollarMatch = text.match(/\$(\d+)\s*off/);
    if (dollarMatch && deal.originalPrice) {
      const savings = parseInt(dollarMatch[1]);
      return Math.round((savings / deal.originalPrice) * 100);
    }
    
    return 0;
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [dealsData, dispensariesData] = await Promise.all([
        dealService.getAll(),
        dispensaryService.getAll()
      ]);
      
      setDeals(dealsData);
      setDispensaries(dispensariesData);
    } catch (err) {
      setError("Failed to load deals. Please try again.");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

useEffect(() => {
    let filtered = [...deals];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(deal =>
        deal.title.toLowerCase().includes(query) ||
        deal.description.toLowerCase().includes(query) ||
        deal.productCategory.toLowerCase().includes(query) ||
        deal.dispensary?.name.toLowerCase().includes(query)
      );
    }

    // Apply dispensary filter
    if (filters.dispensaries.length > 0) {
      filtered = filtered.filter(deal =>
        filters.dispensaries.includes(deal.dispensaryId.toString())
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(deal =>
        filters.categories.includes(deal.productCategory.toLowerCase())
      );
    }

    // Apply deal type filter
    if (filters.dealTypes.length > 0) {
      filtered = filtered.filter(deal => {
        const now = new Date();
        const validFrom = new Date(deal.validFrom);
        const validUntil = new Date(deal.validUntil);
        
        if (filters.dealTypes.includes("daily")) {
          const diffDays = Math.ceil((validUntil - validFrom) / (1000 * 60 * 60 * 24));
          if (diffDays <= 1) return true;
        }
        
        if (filters.dealTypes.includes("weekly")) {
          const diffDays = Math.ceil((validUntil - validFrom) / (1000 * 60 * 60 * 24));
          if (diffDays > 1 && diffDays <= 7) return true;
        }
        
        if (filters.dealTypes.includes("flash")) {
          const hoursUntilExpiry = Math.ceil((validUntil - now) / (1000 * 60 * 60));
          if (hoursUntilExpiry <= 24) return true;
        }
        
        return false;
      });
    }

    // Apply sorting
    switch (sortBy) {
      case "discount":
        filtered.sort((a, b) => {
          const discountA = extractDiscountPercentage(a);
          const discountB = extractDiscountPercentage(b);
          return discountB - discountA; // Highest to lowest
        });
        break;
        
      case "distance":
        if (userLocation) {
          filtered.sort((a, b) => {
            const dispensaryA = dispensaries.find(d => d.Id === a.dispensaryId);
            const dispensaryB = dispensaries.find(d => d.Id === b.dispensaryId);
            
            if (!dispensaryA?.coordinates || !dispensaryB?.coordinates) {
              return 0;
            }
            
            const distanceA = calculateDistance(
              userLocation.latitude, 
              userLocation.longitude,
              dispensaryA.coordinates.latitude,
              dispensaryA.coordinates.longitude
            );
            
            const distanceB = calculateDistance(
              userLocation.latitude,
              userLocation.longitude, 
              dispensaryB.coordinates.latitude,
              dispensaryB.coordinates.longitude
            );
            
            return distanceA - distanceB; // Closest first
          });
        }
        break;
        
      case "recency":
        filtered.sort((a, b) => {
          const dateA = new Date(a.lastUpdated || a.validFrom);
          const dateB = new Date(b.lastUpdated || b.validFrom);
          return dateB - dateA; // Newest first
        });
        break;
        
      case "alphabetical":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
        
      default:
        // Default to recency
        filtered.sort((a, b) => {
          const dateA = new Date(a.lastUpdated || a.validFrom);
          const dateB = new Date(b.lastUpdated || b.validFrom);
          return dateB - dateA;
        });
    }

    setFilteredDeals(filtered);
  }, [deals, searchQuery, filters, sortBy, userLocation, dispensaries]);

  const handleSortChange = async (newSortBy) => {
    setSortBy(newSortBy);
    
    if (newSortBy === "distance" && !userLocation) {
      try {
        await getCurrentLocation();
        toast.success("Location access granted");
      } catch (error) {
        toast.error("Location access required for distance sorting");
        setSortBy("recency"); // Fall back to recency if location fails
      }
    }
  };

  const calculateDealCounts = () => {
    const counts = {
      dispensaries: {},
      categories: {
        flower: 0,
        edibles: 0,
        concentrates: 0,
        vapes: 0,
        accessories: 0
      },
      dealTypes: {
        daily: 0,
        weekly: 0,
        flash: 0
      }
    };

    deals.forEach(deal => {
      // Count by dispensary
      counts.dispensaries[deal.dispensaryId] = (counts.dispensaries[deal.dispensaryId] || 0) + 1;
// Count by category
      const category = deal.productCategory.toLowerCase();
      if (Object.prototype.hasOwnProperty.call(counts.categories, category)) {
        counts.categories[category]++;
      }
      // Count by deal type
      const now = new Date();
      const validFrom = new Date(deal.validFrom);
      const validUntil = new Date(deal.validUntil);
      const diffDays = Math.ceil((validUntil - validFrom) / (1000 * 60 * 60 * 24));
      const hoursUntilExpiry = Math.ceil((validUntil - now) / (1000 * 60 * 60));
      
      if (diffDays <= 1) counts.dealTypes.daily++;
      else if (diffDays <= 7) counts.dealTypes.weekly++;
      if (hoursUntilExpiry <= 24) counts.dealTypes.flash++;
    });

    return counts;
  };

  const handleViewDetails = (deal) => {
    // Add dispensary info to deal
    const dispensary = dispensaries.find(d => d.Id === deal.dispensaryId);
    setSelectedDeal({ ...deal, dispensary });
    setIsModalOpen(true);
  };

  const handleToggleFavorite = (dealId) => {
    setFavoriteDeals(prev => {
      if (prev.includes(dealId)) {
        toast.success("Deal removed from favorites");
        return prev.filter(id => id !== dealId);
      } else {
        toast.success("Deal added to favorites");
        return [...prev, dealId];
      }
    });
  };

  const handleVisitWebsite = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const clearAllFilters = () => {
    setFilters({
      dispensaries: [],
      categories: [],
      dealTypes: []
    });
  };

  const hasActiveFilters = 
    filters.dispensaries.length > 0 || 
    filters.categories.length > 0 || 
    filters.dealTypes.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          <FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            dispensaries={dispensaries}
            dealCounts={calculateDealCounts()}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          <div className="flex-1 lg:pl-8">
            <div className="p-6">
              {/* Header */}
<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div className="mb-4 lg:mb-0">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Latest Cannabis Deals in New Jersey - July 2025
                  </h1>
                  <p className="text-gray-600">
                    Fresh deals updated daily from loyalty programs and newsletters
                    {filteredDeals.length > 0 && (
                      <span className="ml-2 font-medium">
                        ({filteredDeals.length} deals found)
                      </span>
                    )}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                  {/* Sort Dropdown */}
                  <div className="flex items-center space-x-2">
                    <label htmlFor="sort-select" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                      Sort by:
                    </label>
                    <select
                      id="sort-select"
                      value={sortBy}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary min-w-[140px]"
                    >
                      <option value="recency">Most Recent</option>
                      <option value="discount">Highest Discount</option>
                      <option value="distance">Distance</option>
                      <option value="alphabetical">A-Z</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {hasActiveFilters && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={clearAllFilters}
                      >
                        <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
                        Clear Filters
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsSidebarOpen(true)}
                      className="lg:hidden"
                    >
                      <ApperIcon name="SlidersHorizontal" className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </div>
                </div>
              </div>

              {/* Deal Grid */}
              <DealGrid
                deals={filteredDeals}
                loading={loading}
                error={error}
                onRetry={loadData}
                onViewDetails={handleViewDetails}
                onToggleFavorite={handleToggleFavorite}
                favoriteDeals={favoriteDeals}
                onClearFilters={clearAllFilters}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Deal Modal */}
      <DealModal
        deal={selectedDeal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onVisitWebsite={handleVisitWebsite}
      />
    </div>
  );
};

export default DealsPage;