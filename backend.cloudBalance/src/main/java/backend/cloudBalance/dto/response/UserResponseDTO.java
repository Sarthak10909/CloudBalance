package backend.cloudBalance.dto.response;

import backend.cloudBalance.entity.enums.RoleType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private RoleType role;
}





