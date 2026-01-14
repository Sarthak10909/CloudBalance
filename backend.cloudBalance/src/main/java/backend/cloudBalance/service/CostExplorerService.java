package backend.cloudBalance.service;

import backend.cloudBalance.dto.response.CostgraphResponseDTO;
import backend.cloudBalance.entity.enums.CostGroupBy;

import java.time.LocalDate;
import java.util.List;

public interface CostExplorerService {
    List<CostgraphResponseDTO> getGraphData(CostGroupBy groupBy, LocalDate startDate, LocalDate endDate, List<String> values);

    List<String> getFilterValues(CostGroupBy groupBy);
}
