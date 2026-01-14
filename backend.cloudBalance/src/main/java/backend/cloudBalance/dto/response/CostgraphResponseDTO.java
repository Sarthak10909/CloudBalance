package backend.cloudBalance.dto.response;

import java.math.BigDecimal;

public record CostgraphResponseDTO(
        String billMonth,
        String groupValue,
        BigDecimal totalCost
) {}
