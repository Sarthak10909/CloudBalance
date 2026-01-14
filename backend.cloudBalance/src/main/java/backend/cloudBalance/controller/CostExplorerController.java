package backend.cloudBalance.controller;

import backend.cloudBalance.dto.response.CostgraphResponseDTO;
import backend.cloudBalance.entity.enums.CostGroupBy;
import backend.cloudBalance.service.CostExplorerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/cost-explorer")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class CostExplorerController {

    @Autowired
    private CostExplorerService service;

    @GetMapping("/graph")
    public List<CostgraphResponseDTO> getGraph(
            @RequestParam CostGroupBy groupBy,
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam(required = false) List<String> values
    ) {
        return service.getGraphData(
                groupBy,
                LocalDate.parse(startDate),
                LocalDate.parse(endDate),
                values
        );
    }

    @GetMapping("/filters")
    public ResponseEntity<List<String>> getFilterValues(
            @RequestParam CostGroupBy groupBy
    ) {
        return ResponseEntity.ok(
                service.getFilterValues(groupBy)
        );
    }

}
