import React, { useState } from "react";

const filterOptions = [
  { label: "Service", value: "SERVICE" },
  { label: "Instance Type", value: "INSTANCE_TYPE" },
  { label: "Region", value: "REGION" },
  { label: "Account", value: "ACCOUNT" },
  { label: "Usage Type", value: "USAGE_TYPE" },
  { label: "Platform", value: "PLATFORM" },
  { label: "Usage Type Group", value: "USAGE_TYPE_GROUP" },
];

function FilterPanel({ onApply }) {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleChange = (value) => {
    setSelectedFilters((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const handleApply = () => {
    if (selectedFilters.length === 0) return;

    // Backend-ready payload
    onApply(selectedFilters);
  };

  return (
    <div className="bg-white border rounded-lg p-4 w-70">
      <h3 className="text-sm font-semibold mb-3">Filters</h3>

      <div className="flex flex-col gap-2 mb-4">
        {filterOptions.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedFilters.includes(option.value)}
              onChange={() => handleChange(option.value)}
              className="accent-blue-600"
            />
            {option.label}
          </label>
        ))}
      </div>

      <button
        onClick={handleApply}
        disabled={selectedFilters.length === 0}
        className={`w-full px-3 py-2 text-sm rounded-md transition
          ${
            selectedFilters.length > 0
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
      >
        Apply Filters
      </button>
    </div>
  );
}

export default FilterPanel;
