package backend.cloudBalance.service.impl;

import backend.cloudBalance.dto.request.AccountDTO;
import backend.cloudBalance.dto.response.AccountResponseDTO;
import backend.cloudBalance.entity.Account;
import backend.cloudBalance.repo.AccountRepository;
import backend.cloudBalance.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AccountServiceImpl implements AccountService {

    AccountRepository accountRepository;

    @Override
    public void createAccount(AccountDTO accountDTO) {
        Account account = new Account();
        account.setArnRole(accountDTO.getArnRole());
        account.setAccountName(accountDTO.getAccountName());
        account.setAccountId(accountDTO.getAccountId());

        accountRepository.save(account);
    }

    @Override
    public List<AccountResponseDTO> getAllAccounts() {
        List<Account> accounts = accountRepository.findAll();

        return accounts.stream()
                .map(account -> {
                    AccountResponseDTO dto = new AccountResponseDTO();
                    dto.setId(account.getId());
                    dto.setAccountName(account.getAccountName());
                    return dto;
                })
                .toList();
    }

}
