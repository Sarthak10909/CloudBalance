import { useEffect, useState } from "react";
import CostExplorerHeader from "./CostExplorerHeader";
import CostExplorerBody from "./CostExplorerBody";
import FilterPanel from "./FilterPanel";
import axiosInstance from "../../api/axiosInstance";

function CostExplorerContainer() {
    const [groupBy, setGroupBy] = useState("SERVICE");
    const [fromDate, setFromDate] = useState("2025-01-01");
    const [toDate, setToDate] = useState("2025-06-30");

    const [filters, setFilters] = useState({});
    const [showFilters, setShowFilters] = useState(true);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchGraph();
    }, [groupBy, fromDate, toDate, filters]);

    //   const fetchGraph = async () => {
    //     try {
    //       setLoading(true);
    //       setError(null);

    //       const res = await axiosInstance.get(
    //         "/api/cost-explorer/graph",
    //         {
    //           params: new URLSearchParams({
    //             groupBy,
    //             startDate: fromDate,
    //             endDate: toDate,
    //             ...filters
    //           }),
    //         }
    //       );

    //       console.log("GRAPH DATA:", res.data);
    //       setData(res.data || []);
    //     } catch (err) {
    //       setError("Failed to load graph");
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    const fetchGraph = async () => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();
            params.append("groupBy", groupBy);
            params.append("startDate", fromDate);
            params.append("endDate", toDate);

            if (filters[groupBy]) {
                filters[groupBy].forEach(v => params.append("values", v));
            }

            console.log("FINAL REQUEST PARAMS:", params.toString());

            const res = await axiosInstance.get(
                `/api/cost-explorer/graph?${params.toString()}`
            );

            console.log("FINAL REQUEST PARAMS:", params.toString());
            console.log("GRAPH DATA:", res.data);

            setData(res.data || []);
        } catch (err) {
            console.error(err);
            setError("Failed to load graph");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <CostExplorerHeader
                groupBy={groupBy}
                setGroupBy={setGroupBy}
                onToggleFilters={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
            />

            <div className="flex gap-6">
                <div className="flex-1">
                    <CostExplorerBody
                        groupBy={groupBy}
                        data={data}
                        loading={loading}
                        error={error}
                        fromDate={fromDate}
                        toDate={toDate}
                        setFromDate={setFromDate}
                        setToDate={setToDate}
                    />
                </div>

                {showFilters && (
                    <FilterPanel filters={filters}
                        onApply={setFilters}
                        onReset={() => setFilters({})}
                        onClose={() => setShowFilters(false)} />
                )}
            </div>
        </div>
    );
}

export default CostExplorerContainer;
