package backend.cloudBalance.dto.request;

import backend.cloudBalance.entity.Account;
import backend.cloudBalance.entity.enums.RoleType;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class EditUserDTO {
    private String firstName;
    private String lastName;
    private String email;
    private RoleType role;
    private String password;
    private List<Long> accountIds = new ArrayList<>();
}
