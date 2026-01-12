package backend.cloudBalance.controller;

import backend.cloudBalance.dto.request.AddUserDto;
import backend.cloudBalance.dto.request.EditUserDTO;
import backend.cloudBalance.dto.response.AccountResponseDTO;
import backend.cloudBalance.dto.response.EditResponseDTO;
import backend.cloudBalance.dto.response.UserResponseDTO;
import backend.cloudBalance.entity.User;
import backend.cloudBalance.service.UserService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@EnableMethodSecurity
@RestController
@RequestMapping("/dashboard/users")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class UserController {
    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'READ_ONLY')")
    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers(){
        List<UserResponseDTO> user = userService.getUsers();
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/addUser")
    public ResponseEntity<UserResponseDTO> createUser(@RequestBody AddUserDto addUserDto){
        UserResponseDTO user = userService.createUser(addUserDto);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/editUser/{id}")
    public ResponseEntity<?> editUser(@PathVariable Long id, @RequestBody EditUserDTO editUserDTO){

        userService.editUser(id, editUserDTO);
        return new ResponseEntity<>("User edited", HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}/userAccount")
    public ResponseEntity<?> getAccountsForUser(@PathVariable Long id){
        EditResponseDTO editResponeDTO = userService.getUserWithAccount(id);
        return new ResponseEntity<>(editResponeDTO, HttpStatus.OK);
    }

//    @GetMapping("/getUser/{id}")
//    public ResponseEntity<?> getUser(@PathVariable Long id){
//        UserResponseDTO userResponseDTO = userService.getUser(id);
//        return new ResponseEntity<>(userResponseDTO, HttpStatus.OK);
//    }
}





