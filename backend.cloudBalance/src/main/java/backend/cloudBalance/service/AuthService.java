package backend.cloudBalance.service;

import backend.cloudBalance.dto.request.LoginDTO;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {
    String loginMethod(LoginDTO request, HttpServletResponse response);

    String refreshMethod(String token);

    void logoutMethod(String token);
}
