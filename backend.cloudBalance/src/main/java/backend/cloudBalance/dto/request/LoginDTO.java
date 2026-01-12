package backend.cloudBalance.dto.request;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
public class LoginDTO {
    @NonNull
    String email;

    @NonNull
    String password;
}
