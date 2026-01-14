package backend.cloudBalance.repo;

import backend.cloudBalance.dto.response.CostgraphResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

//@Repository
//public class SnowflakeRepository {
//
//    @Autowired
//    @Qualifier("snowflakeJdbcTemplate")
//    private JdbcTemplate jdbcTemplate;
//
//    public List<CostgraphResponseDTO> getGraphData(
//            String groupByColumn,
//            LocalDate startDate,
//            LocalDate endDate
//    ) {
//
//        String sql = """
//            SELECT
//                DATE_TRUNC('MONTH', BILL_DATE) AS BILL_MONTH,
//                %s AS GROUP_VALUE,
//                COUNT(*) AS TOTAL_COUNT
//            FROM SNOWFLAKE_LEARNING_DB.PUBLIC.COSTEXPLORER
//            WHERE BILL_DATE BETWEEN ? AND ?
//            GROUP BY BILL_MONTH, GROUP_VALUE
//            ORDER BY BILL_MONTH
//        """.formatted(groupByColumn);
//
//        return jdbcTemplate.query(
//                sql,
//                ps -> {
//                    ps.setObject(1, startDate);
//                    ps.setObject(2, endDate);
//                },
//                (rs, rowNum) -> new CostgraphResponseDTO(
//                        rs.getString("BILL_MONTH"),
//                        rs.getString("GROUP_VALUE"),
//                        rs.getLong("TOTAL_COUNT")
//                )
//        );
//    }
//}

@Repository
public class SnowflakeRepository {

    @Autowired
    @Qualifier("snowflakeJdbcTemplate")
    private JdbcTemplate jdbcTemplate;

    public List<CostgraphResponseDTO> getGraphData(
            String groupByColumn,
            LocalDate startDate,
            LocalDate endDate,
            List<String> values
    ) {

        StringBuilder sql = new StringBuilder("""
                    SELECT
                        DATE_TRUNC('MONTH', BILL_DATE) AS BILL_MONTH,
                        %s AS GROUP_VALUE,
                        SUM(COST) AS TOTAL_COST
                    FROM SNOWFLAKE_LEARNING_DB.PUBLIC.COSTEXPLORER
                    WHERE BILL_DATE BETWEEN ? AND ?
                """.formatted(groupByColumn));

        List<Object> params = new ArrayList<>();
        params.add(java.sql.Date.valueOf(startDate));
        params.add(java.sql.Date.valueOf(endDate));

        // ✅ Apply filter ONLY on groupBy column
        if (values != null && !values.isEmpty()) {
            sql.append(" AND ")
                    .append(groupByColumn)
                    .append(" IN (")
                    .append(String.join(",", Collections.nCopies(values.size(), "?")))
                    .append(")");
            params.addAll(values);
        }

        sql.append("""
                    GROUP BY BILL_MONTH, GROUP_VALUE
                    ORDER BY BILL_MONTH
                """);

        return jdbcTemplate.query(
                sql.toString(),
                params.toArray(),
                (rs, rowNum) -> new CostgraphResponseDTO(
                        rs.getString("BILL_MONTH"),
                        rs.getString("GROUP_VALUE"),
                        rs.getBigDecimal("TOTAL_COST")
                )
        );
    }

    public List<String> getDistinctGroupByValues(String column) {

        String sql = """
        SELECT DISTINCT %s
        FROM SNOWFLAKE_LEARNING_DB.PUBLIC.COSTEXPLORER
        WHERE %s IS NOT NULL
        ORDER BY %s
    """.formatted(column, column, column);

        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> rs.getString(1)
        );
    }


}

