package backend.cloudBalance.controller;

import backend.cloudBalance.repo.SnowflakeRepository;
import com.snowflake.snowpark.Row;
import com.snowflake.snowpark.Session;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.Map;


    @RestController
    @RequestMapping("/snowflake")
    public class SnowflakeController {

        private final SnowflakeRepository repository;

        public SnowflakeController(SnowflakeRepository repository) {
            this.repository = repository;
        }

        @GetMapping("/flake")
        public List<String> snowflake() {
            return repository.getTable();
        }
    }
