package backend.cloudBalance.service;

import backend.cloudBalance.entity.RefreshToken;
import backend.cloudBalance.entity.User;
import jakarta.transaction.Transactional;

public interface RefreshTokenService {
    String create(User user);

    RefreshToken validate(String token);

    @Transactional
    void revoke(String token);
}
