package backend.cloudBalance.service;

import backend.cloudBalance.dto.request.AddUserDto;
import backend.cloudBalance.dto.request.EditUserDTO;
import backend.cloudBalance.dto.response.AccountResponseDTO;
import backend.cloudBalance.dto.response.EditResponseDTO;
import backend.cloudBalance.dto.response.UserResponseDTO;
import backend.cloudBalance.entity.User;

import java.util.List;

public interface UserService {
    List<UserResponseDTO> getUsers();

    UserResponseDTO createUser(AddUserDto addUserDto);

    void editUser(Long Id, EditUserDTO editUserDto);

    EditResponseDTO getUserWithAccount(Long id);

//    UserResponseDTO getUser(Long id);
}
