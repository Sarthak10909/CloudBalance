const GROUPS = [
  { key: "SERVICE", label: "Service" },
  { key: "PLATFORM", label: "Platform" },
  { key: "INSTANCE_TYPE", label: "Instance Type" },
  { key: "USAGE_TYPE", label: "Usage Type" },
  { key: "ACCOUNT_ID", label: "Account ID" },
  { key: "REGION", label: "Region" },
];

export default function CostExplorerHeader({
  groupBy,
  setGroupBy,
  onToggleFilters,
  showFilters,
}) {
  return (
    <div className="bg-white border rounded p-4 mb-4">
      <div className="flex justify-between">
        <div className="flex gap-2 flex-wrap">
          {GROUPS.map((g) => (
            <button
              key={g.key}
              onClick={() => setGroupBy(g.key)}
              className={`px-3 py-1 text-sm border rounded ${
                groupBy === g.key
                  ? "bg-blue-600 text-white"
                  : "bg-white"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        <button
          onClick={onToggleFilters}
          className={`px-3 py-2 border rounded ${showFilters
            ? "bg-blue-100 text-blue-600 border-blue-500"
            : "bg-white hover:bg-gray-100 text-gray-600 border-gray-300"
          }`}
        >
          Filters        
        </button>
      </div>
    </div>
  );
}
