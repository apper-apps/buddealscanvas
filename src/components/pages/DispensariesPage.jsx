import React, { useState, useEffect } from "react";
import DispensaryList from "@/components/organisms/DispensaryList";
import { dispensaryService } from "@/services/api/dispensaryService";

const DispensariesPage = ({ searchQuery }) => {
  const [dispensaries, setDispensaries] = useState([]);
  const [filteredDispensaries, setFilteredDispensaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDispensaries = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await dispensaryService.getAll();
      setDispensaries(data);
    } catch (err) {
      setError("Failed to load dispensaries. Please try again.");
      console.error("Error loading dispensaries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDispensaries();
  }, []);

  useEffect(() => {
    let filtered = [...dispensaries];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(dispensary =>
        dispensary.name.toLowerCase().includes(query) ||
        dispensary.location.toLowerCase().includes(query) ||
        dispensary.address.toLowerCase().includes(query)
      );
    }

    setFilteredDispensaries(filtered);
  }, [dispensaries, searchQuery]);

  const handleVisitWebsite = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            New Jersey Dispensaries
          </h1>
          <p className="text-gray-600">
            Browse participating dispensaries in our network
            {filteredDispensaries.length > 0 && (
              <span className="ml-2 font-medium">
                ({filteredDispensaries.length} dispensaries)
              </span>
            )}
          </p>
        </div>

        <DispensaryList
          dispensaries={filteredDispensaries}
          loading={loading}
          error={error}
          onRetry={loadDispensaries}
          onVisitWebsite={handleVisitWebsite}
        />
      </div>
    </div>
  );
};

export default DispensariesPage;