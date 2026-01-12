package backend.cloudBalance.repo;

import com.snowflake.snowpark.Row;
import com.snowflake.snowpark.Session;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Repository
public class SnowflakeRepository {

    private final Session session;

    public SnowflakeRepository(Session session) {
        this.session = session;
    }

    public List<String> getTable() {

        Row[] rows = session
                .sql("SELECT * FROM SNOWFLAKE_LEARNING_DB.PUBLIC.COSTEXPLORER")
                .collect();

        return Arrays.stream(rows)
                .map(Row::toString)
                .toList();
    }
}
