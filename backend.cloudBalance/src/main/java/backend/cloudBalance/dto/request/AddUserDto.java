package backend.cloudBalance.dto.request;


import backend.cloudBalance.entity.Account;
import backend.cloudBalance.entity.enums.RoleType;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Setter
@Getter
public class AddUserDto {

    private String firstName;
    private String lastName;
    private String email;
    private RoleType role;
    private String password;

}
