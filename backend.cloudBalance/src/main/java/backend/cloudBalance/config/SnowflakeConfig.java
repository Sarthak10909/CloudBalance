//package backend.cloudBalance.config;
//import com.snowflake.snowpark.Session;
//import net.snowflake.client.jdbc.SnowflakeBasicDataSource;
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.jdbc.core.JdbcTemplate;
//
//import javax.sql.DataSource;
//import java.util.HashMap;
//import java.util.Map;
//
//@Configuration
//public class SnowflakeConfig {
//
//    @Value("${spring.snowflake.url}")
//    private String url;
//    @Value("${spring.snowflake.user}")
//    private String user;
//    @Value("${spring.snowflake.password}")
//    private String password;
//    @Value("${spring.snowflake.role}")
//    private String role;
//    @Value("${spring.snowflake.db}")
//    private String db;
//    @Value("${spring.snowflake.schema}")
//    private String schema;
//
//    @Bean
//    public Session createSession (){
//        Map<String,String> properties = new HashMap<>();
//        properties.put("URL",url);
//        properties.put("USER",user);
//        properties.put("PASSWORD",password);
//        properties.put("ROLE",role);
//        properties.put("DB",db);
//        properties.put("SCHEMA",schema);
//
//        return Session.builder().configs(properties).create();
//
//    }
//}

package backend.cloudBalance.config;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.snowflake.snowpark.Session;
import org.springframework.beans.factory.annotation.Value;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class SnowflakeConfig {

    @Value("${snowflake.url}")
    private String url;
    @Value("${snowflake.user}")
    private String user;
    @Value("${snowflake.password}")
    private String password;
    @Value("${snowflake.role}")
    private String role;
    @Value("${snowflake.db}")
    private String db;
    @Value("${snowflake.schema}")
    private String schema;

    @Bean
    public Session createSession (){
        Map<String,String> properties = new HashMap<>();
        properties.put("URL",url);
        properties.put("USER",user);
        properties.put("PASSWORD",password);
        properties.put("ROLE",role);
        properties.put("DB",db);
        properties.put("SCHEMA",schema);

        return Session.builder().configs(properties).create();

    }
}
