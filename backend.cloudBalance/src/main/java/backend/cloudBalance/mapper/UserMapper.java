package backend.cloudBalance.mapper;

import backend.cloudBalance.dto.response.UserResponseDTO;
import backend.cloudBalance.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserResponseDTO responseDTO(User user){
        UserResponseDTO res = new UserResponseDTO();
        res.setId(user.getId());
        res.setFirstName(user.getFirstName());
        res.setLastName(user.getLastName());
        res.setEmail(user.getEmail());
        res.setRole(user.getRole().getRoleType());

        return res;
    }
}
