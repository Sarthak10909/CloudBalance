package backend.cloudBalance.service.impl;

import backend.cloudBalance.dto.response.CostgraphResponseDTO;
import backend.cloudBalance.entity.enums.CostGroupBy;
import backend.cloudBalance.repo.SnowflakeRepository;
import backend.cloudBalance.service.CostExplorerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CostExplorerServiceImpl implements CostExplorerService {

    @Autowired
    private SnowflakeRepository repository;

    @Override
    public List<CostgraphResponseDTO> getGraphData(
            CostGroupBy groupBy,
            LocalDate startDate,
            LocalDate endDate,
            List<String> values
    ) {

        String column = switch (groupBy) {
            case SERVICE -> "SERVICE";
            case REGION -> "REGION";
            case PLATFORM -> "PLATFORM";
            case USAGE_TYPE -> "USAGE_TYPE";
            case USAGE_TYPE_GROUP -> "USAGE_TYPE_GROUP";
            case TENANCY -> "TENANCY";
            case INSTANCE_TYPE -> "INSTANCE_TYPE";
            case ACCOUNT_ID -> "ACCOUNT_TYPE";
        };

        return repository.getGraphData(column, startDate, endDate, values);
    }

    @Override
    public List<String> getFilterValues(CostGroupBy groupBy) {
        return repository.getDistinctGroupByValues(groupBy.name());
    }
}


//    private List<CostgraphResponseDTO> mapToResponse(List<Object[]> rows) {
//        return rows.stream()
//                .map(r -> new CostgraphResponseDTO(
//                        r[0].toString(),     // BILL_MONTH
//                        (String) r[1],       // GROUP_VALUE,
//                        ((Number) r[2]).longValue()
//                ))
//                .toList(); // Java 16+
//    }
//}