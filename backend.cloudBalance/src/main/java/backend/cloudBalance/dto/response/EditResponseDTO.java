package backend.cloudBalance.dto.response;

import backend.cloudBalance.entity.Account;
import backend.cloudBalance.entity.enums.RoleType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class EditResponseDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private RoleType role;

    List<Long> accountIds;

}

