package backend.cloudBalance.controller;

import backend.cloudBalance.dto.request.AccountDTO;
import backend.cloudBalance.dto.response.AccountResponseDTO;
import backend.cloudBalance.service.AccountService;
import backend.cloudBalance.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accounts")
@AllArgsConstructor
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class AccountController {

    AccountService accountService;

    @PostMapping("/createAccount")
    ResponseEntity<?> createAccount(@RequestBody AccountDTO accountDTO){
        accountService.createAccount(accountDTO);
        return new ResponseEntity<>("Created account successfully", HttpStatus.CREATED);
    }

    @GetMapping("/fetchAccount")
    ResponseEntity<?> getAllAccounts(){
        List<AccountResponseDTO> accounts = accountService.getAllAccounts();
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }

}
