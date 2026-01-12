package backend.cloudBalance.controller;

import backend.cloudBalance.dto.request.LoginDTO;
import backend.cloudBalance.dto.response.LoginResponseDTO;
import backend.cloudBalance.service.impl.AuthServiceImpl;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class AuthController {

    @Autowired
    AuthServiceImpl authServiceImpl;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginDTO request, HttpServletResponse response){
        String accessToken = authServiceImpl.loginMethod(request, response);
//        return new ResponseEntity<>("User successfully logged in: " + accessToken, HttpStatus.CREATED);
        System.out.println("this is it");
        return ResponseEntity.ok(new LoginResponseDTO(accessToken));
    }

    @PostMapping("/refresh")
    public ResponseEntity<String> refresh(@CookieValue("refreshToken") String token){
        String accessToken = authServiceImpl.refreshMethod(token);

        return new ResponseEntity<>(accessToken, HttpStatus.CREATED);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@CookieValue("refreshToken") String token){

        authServiceImpl.logoutMethod(token);

        return new ResponseEntity<>("Logged out successfully", HttpStatus.OK);
    }
}
