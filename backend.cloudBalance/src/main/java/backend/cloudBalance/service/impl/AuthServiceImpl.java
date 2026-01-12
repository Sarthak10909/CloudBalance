package backend.cloudBalance.service.impl;

import backend.cloudBalance.dto.request.LoginDTO;
import backend.cloudBalance.entity.RefreshToken;
import backend.cloudBalance.entity.User;
import backend.cloudBalance.exception.UserNotFoundException;
import backend.cloudBalance.repo.UserRepository;
import backend.cloudBalance.security.JwtUtil;
import backend.cloudBalance.service.AuthService;
import backend.cloudBalance.service.RefreshTokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    RefreshTokenService refreshTokenService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    CustomUserDetailsServiceImpl customUserDetailsServiceImpl;

    @Override
    public String loginMethod(LoginDTO request, HttpServletResponse response){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        System.out.println("Authorities from authentication:");
        authentication.getAuthorities()
                .forEach(a -> System.out.println(a.getAuthority()));


        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found with the email " + userDetails.getUsername()));

        String accessToken = jwtUtil.generateAccessToken(userDetails);
        String refreshToken = refreshTokenService.create(user);

        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setPath("/auth");
        cookie.setMaxAge(60 * 60 * 24 * 7);
        response.addCookie(cookie);

        return accessToken;
    }

    @Override
    public String refreshMethod(String token){
        RefreshToken refreshToken = refreshTokenService.validate(token);

        UserDetails userDetails = customUserDetailsServiceImpl.loadUserByUsername(refreshToken.getUser().getEmail());

        String accessToken = jwtUtil.generateAccessToken(userDetails);

        return accessToken;

    }

    @Override
    public void logoutMethod(String token){
        refreshTokenService.revoke(token);
    }
}
