import React, { useState } from "react";
import FilterGroup from "@/components/molecules/FilterGroup";
import CheckboxGroup from "@/components/molecules/CheckboxGroup";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const FilterSidebar = ({ 
  filters, 
  onFiltersChange, 
  dispensaries, 
  dealCounts,
  isOpen,
  onClose 
}) => {
  const [expandedGroups, setExpandedGroups] = useState({
    dispensaries: true,
    categories: true,
    dealTypes: true
  });

  const toggleGroup = (groupName) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const handleFilterChange = (filterType, values) => {
    onFiltersChange({
      ...filters,
      [filterType]: values
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      dispensaries: [],
      categories: [],
      dealTypes: []
    });
  };

  const hasActiveFilters = 
    filters.dispensaries.length > 0 || 
    filters.categories.length > 0 || 
    filters.dealTypes.length > 0;

  const dispensaryOptions = dispensaries.map(dispensary => ({
    value: dispensary.Id.toString(),
    label: dispensary.name,
    count: dealCounts.dispensaries[dispensary.Id] || 0
  }));

const categoryOptions = [
    { value: "flower", label: "Flower", count: dealCounts.categories.flower || 0 },
    { value: "edibles", label: "Edibles", count: dealCounts.categories.edibles || 0 },
    { value: "concentrates", label: "Concentrates", count: dealCounts.categories.concentrates || 0 },
    { value: "vapes", label: "Vapes", count: dealCounts.categories.vapes || 0 },
    { value: "accessories", label: "Accessories", count: dealCounts.categories.accessories || 0 }
  ];

  const dealTypeOptions = [
    { value: "daily", label: "Daily Specials", count: dealCounts.dealTypes.daily || 0 },
    { value: "weekly", label: "Weekly Deals", count: dealCounts.dealTypes.weekly || 0 },
    { value: "flash", label: "Flash Sales", count: dealCounts.dealTypes.flash || 0 }
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={clearAllFilters}
              className="text-xs"
            >
              Clear All
            </Button>
          )}
          <button
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-gray-100 rounded-md transition-colors duration-150"
          >
            <ApperIcon name="X" className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-2">
          <FilterGroup
            title="Dispensaries"
            icon="Building"
            isExpanded={expandedGroups.dispensaries}
            onToggle={() => toggleGroup("dispensaries")}
          >
            <CheckboxGroup
              options={dispensaryOptions}
              selectedValues={filters.dispensaries}
              onChange={(values) => handleFilterChange("dispensaries", values)}
            />
          </FilterGroup>

          <FilterGroup
            title="Product Categories"
            icon="Package"
            isExpanded={expandedGroups.categories}
            onToggle={() => toggleGroup("categories")}
          >
            <CheckboxGroup
              options={categoryOptions}
              selectedValues={filters.categories}
              onChange={(values) => handleFilterChange("categories", values)}
            />
          </FilterGroup>

          <FilterGroup
            title="Deal Types"
            icon="Tag"
            isExpanded={expandedGroups.dealTypes}
            onToggle={() => toggleGroup("dealTypes")}
          >
            <CheckboxGroup
              options={dealTypeOptions}
              selectedValues={filters.dealTypes}
              onChange={(values) => handleFilterChange("dealTypes", values)}
            />
          </FilterGroup>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-white border-r border-gray-200 h-full">
        {sidebarContent}
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;