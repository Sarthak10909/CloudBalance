package backend.cloudBalance.dto.response;

public class LoginResponseDTO {
    private String role;
    private String accessToken;

    public LoginResponseDTO(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }
}
