package backend.cloudBalance.service;

import backend.cloudBalance.dto.request.AccountDTO;
import backend.cloudBalance.dto.response.AccountResponseDTO;
import backend.cloudBalance.dto.response.LoginResponseDTO;

import java.util.List;

public interface AccountService {

    void createAccount(AccountDTO accountDTO);

     List<AccountResponseDTO> getAllAccounts();
}
