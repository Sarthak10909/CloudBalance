package backend.cloudBalance.dto.response;

public class ErrorResponseDTO {
    private int status;
    private String message;
    private long timestamp;

    public ErrorResponseDTO(int status, String message){
        this.status = status;
        this.message = message;
        this.timestamp = System.currentTimeMillis();
    }
}
