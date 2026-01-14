// import { useEffect, useState } from "react";
// import axiosInstance from "../../api/axiosInstance";

// export default function FilterPanel({
//   groupBy,
//   appliedValues = [],
//   onApply,
//   onClose,
// }) {
//   const [values, setValues] = useState([]);
//   const [selected, setSelected] = useState(appliedValues);

//   useEffect(() => {
//     fetchFilters();
//   }, [groupBy]);

//   const fetchFilters = async () => {
//     try {
//       const res = await axiosInstance.get("/api/cost-explorer/filters", {
//         params: { groupBy },
//       });
//       setValues(res.data || []);
//     } catch {
//       setValues([]);
//     }
//   };

//   const toggle = (v) => {
//     setSelected((p) =>
//       p.includes(v) ? p.filter(x => x !== v) : [...p, v]
//     );
//   };

//   return (
//     <div className="w-72 bg-white border rounded p-4 shadow-sm">
//       <div className="flex justify-between mb-3">
//         <h3 className="font-semibold">Filters</h3>
//         <button onClick={onClose} className="text-blue-600 text-sm">Close</button>
//       </div>

//       <div className="max-h-72 overflow-y-auto space-y-2">
//         {values.map(v => (
//           <label key={v} className="flex gap-2 text-sm">
//             <input
//               type="checkbox"
//               checked={selected.includes(v)}
//               onChange={() => toggle(v)}
//             />
//             {v}
//           </label>
//         ))}
//       </div>

//       <button
//         onClick={() => onApply(selected)}
//         className="w-full mt-4 bg-blue-600 text-white py-2 rounded"
//       >
//         Apply
//       </button>
//     </div>
//   );
// }

// export default function FilterPanel({ onClose }) {
//   return (
//     <div className="w-72 bg-white border rounded p-4">
//       <div className="flex justify-between mb-3">
//         <h3 className="font-semibold">Filters</h3>
//         <button onClick={onClose}>Close</button>
//       </div>

//       <div className="text-sm text-gray-500">
//         Filter API integration next step
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";

export default function FilterPanel({ filters, onApply, onReset, onClose }) {
  const [open, setOpen] = useState(null);
  const [localFilters, setLocalFilters] = useState(filters || {});
  const [filterOptions, setFilterOptions] = useState({});
  const [loadingKey, setLoadingKey] = useState(null);

  useEffect(() => {
    setLocalFilters(filters || {});
  }, [filters]);

  /* 🔹 FETCH FILTER VALUES FROM API */
  const fetchFilterValues = async (key) => {
    if (filterOptions[key]) return; // already fetched

    try {
      setLoadingKey(key);

      const res = await axiosInstance.get(
        "/api/cost-explorer/filters",
        { params: { groupBy: key } }
      );

      setFilterOptions((prev) => ({
        ...prev,
        [key]: Array.isArray(res.data) ? res.data : [],
      }));
    } catch (err) {
      console.error("Failed to fetch filters for", key, err);
      setFilterOptions((prev) => ({ ...prev, [key]: [] }));
    } finally {
      setLoadingKey(null);
    }
  };

  /* 🔹 TOGGLE VALUE */
  const toggleValue = (key, value) => {
    setLocalFilters((prev) => {
      const list = prev[key] || [];
      if (list.includes(value)) {
        const updated = list.filter((v) => v !== value);
        if (!updated.length) {
          const copy = { ...prev };
          delete copy[key];
          return copy;
        }
        return { ...prev, [key]: updated };
      }
      return { ...prev, [key]: [...list, value] };
    });
  };

  /* 🔹 RENDER FILTER (UI SAME) */
  const renderFilter = (key, label) => (
    <div className="border-b border-gray-200 py-2">
      <div
        className="flex justify-between cursor-pointer font-medium text-sm text-gray-700"
        onClick={() => {
          setOpen(open === key ? null : key);
          if (open !== key) fetchFilterValues(key);
        }}
      >
        {label}
        <span className="text-gray-500">
          {localFilters[key]?.length || 0}
        </span>
      </div>

      {open === key && (
        <div className="mt-2 space-y-1 max-h-40 overflow-y-auto">
          {loadingKey === key && (
            <div className="text-xs text-gray-400">Loading...</div>
          )}

          {(filterOptions[key] || []).map((v) => (
            <label key={v} className="flex gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={localFilters[key]?.includes(v) || false}
                onChange={() => toggleValue(key, v)}
              />
              {v}
            </label>
          ))}

          {!loadingKey && filterOptions[key]?.length === 0 && (
            <div className="text-xs text-gray-400">No values</div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-72 bg-white border border-gray-200 rounded shadow-sm p-4 flex flex-col h-full">
      {/* HEADER */}
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Filters</h3>
        <button className="text-blue-600 text-sm" onClick={onClose}>
          Close
        </button>
      </div>

      {/* FILTERS (UI SAME AS BEFORE) */}
      <div className="flex-1 overflow-y-auto">
        {renderFilter("SERVICE", "Service")}
        {renderFilter("REGION", "Region")}
        {renderFilter("PLATFORM", "Platform")}
        {renderFilter("ACCOUNT_ID", "Account ID")}
      </div>

      {/* FOOTER */}
      <div className="flex justify-between gap-2 mt-4 pt-3 border-t border-gray-200">
        <button
          onClick={() => {
            setLocalFilters({});
            onReset();
          }}
          className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
        >
          Reset All
        </button>

        <button
          onClick={() => onApply(localFilters)}
          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
