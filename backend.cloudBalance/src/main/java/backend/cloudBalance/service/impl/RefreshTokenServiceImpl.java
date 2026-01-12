package backend.cloudBalance.service.impl;

import backend.cloudBalance.entity.RefreshToken;
import backend.cloudBalance.entity.User;
import backend.cloudBalance.exception.SessionExpiredException;
import backend.cloudBalance.repo.RefreshTokenRepository;
import backend.cloudBalance.service.RefreshTokenService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
public class RefreshTokenServiceImpl implements RefreshTokenService {
    private static final long Refresh_Expiry = 7;

    @Autowired
    RefreshTokenRepository repo;

    @Override
    public String create(User user){

        repo.findByUser(user).ifPresent(existing ->
                repo.delete(existing)
        );

        String token = UUID.randomUUID().toString();

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(token);
        refreshToken.setUser(user);
        refreshToken.setExpiry(Instant.now().plus(Refresh_Expiry, ChronoUnit.DAYS));

        repo.save(refreshToken);
        return token;
    }

    @Override
    public RefreshToken validate(String token){
        RefreshToken refreshToken = repo.findByToken(token)
                .orElseThrow(() -> new SessionExpiredException("Invalid Session"));

        if(refreshToken.isRevoked() || refreshToken.getExpiry().isBefore(Instant.now())){
            repo.delete(refreshToken);
            throw new SessionExpiredException("Session is Expired");
        }

        return refreshToken;

    }

    @Transactional
    @Override
    public void revoke(String token){
        repo.deleteByToken(token);
    }

}
