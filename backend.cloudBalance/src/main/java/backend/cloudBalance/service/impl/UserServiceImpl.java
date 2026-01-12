package backend.cloudBalance.service.impl;

import backend.cloudBalance.dto.request.AddUserDto;
import backend.cloudBalance.dto.request.EditUserDTO;
import backend.cloudBalance.dto.response.AccountResponseDTO;
import backend.cloudBalance.dto.response.EditResponseDTO;
import backend.cloudBalance.dto.response.UserResponseDTO;
import backend.cloudBalance.entity.Account;
import backend.cloudBalance.entity.Role;
import backend.cloudBalance.entity.User;
import backend.cloudBalance.entity.enums.RoleType;
import backend.cloudBalance.exception.EmailAlreadyExistsException;
import backend.cloudBalance.exception.UserNotFoundException;
import backend.cloudBalance.mapper.UserMapper;
import backend.cloudBalance.repo.AccountRepository;
import backend.cloudBalance.repo.RoleRepository;
import backend.cloudBalance.repo.UserRepository;
import backend.cloudBalance.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.support.CustomSQLExceptionTranslatorRegistrar;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    private final PasswordEncoder passwordEncoder;

    private final RoleRepository roleRepository;

    private final AccountRepository accountRepository;

    @Override
    public List<UserResponseDTO> getUsers(){
        return userRepository.findAll()
                .stream()
                .map(userMapper::responseDTO)
                .toList();
    }

    @Override
    public UserResponseDTO createUser(AddUserDto addUserDto){

        Role role = roleRepository.findByRoleType(addUserDto.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        if(userRepository.findByEmail(addUserDto.getEmail()).isPresent()){
            throw new EmailAlreadyExistsException("User already exist");
        }

        User user = new User();
        user.setEmail(addUserDto.getEmail());
        user.setFirstName(addUserDto.getFirstName());
        user.setLastName(addUserDto.getLastName());
        user.setRole(role);

        String encodedPassword = passwordEncoder.encode(addUserDto.getPassword());
        user.setPassword(encodedPassword);

        User savedUser = userRepository.save(user);

        return userMapper.responseDTO(savedUser);
    }

    @Override
    public void editUser(Long Id, EditUserDTO editUserDTO){

        Role role = roleRepository.findByRoleType(editUserDTO.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        User user = userRepository.findById(Id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id : " + Id));


        List<Account> accounts = accountRepository.findAllById(editUserDTO.getAccountIds());

        System.out.println("Editing account");
        user.getAccounts().clear();

        for (Account account : accounts) {
            user.getAccounts().add(account);     // inverse side
            account.getUsers().add(user);        // owning side
        }

        if(editUserDTO.getEmail() != null){
            user.setEmail(editUserDTO.getEmail());
        }

        if(editUserDTO.getFirstName() != null){
            user.setFirstName(editUserDTO.getFirstName());
        }

        if(editUserDTO.getLastName() != null){
            user.setLastName(editUserDTO.getLastName());
        }

        user.setRole(role);

        String password = editUserDTO.getPassword();

        if(password != null){
            String encodedPassword = passwordEncoder.encode(password);
            user.setPassword(encodedPassword);
        }

        userRepository.save(user);

    }

    @Override
    public EditResponseDTO getUserWithAccount(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found with id: " + id)
                );

        EditResponseDTO dto = new EditResponseDTO();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole().getRoleType());

        List<Long> accountIds = user.getAccounts()
                .stream()
                .map(Account::getId)
                .toList();

        dto.setAccountIds(accountIds);

        return dto;
    }

//    @Override
//    public UserResponseDTO getUser(Long id){
//        User user = userRepository.findById(id)
//                .orElseThrow(() -> new UserNotFoundException("User not found with the id: " + id));
//
//        UserResponseDTO userResponseDTO = new UserResponseDTO();
//
//        userResponseDTO.setEmail(user.getEmail());
//        userResponseDTO.setFirstName(user.getFirstName());
//        userResponseDTO.setLastName(user.getLastName());
//        userResponseDTO.setRole(user.getRole().getRoleType());
//        userResponseDTO.setId(user.getId());
//
//        return userResponseDTO;
//    }
}
