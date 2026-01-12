package backend.cloudBalance.exception.handler;

import backend.cloudBalance.dto.response.ErrorResponseDTO;
import backend.cloudBalance.exception.EmailAlreadyExistsException;
import backend.cloudBalance.exception.SessionExpiredException;
import backend.cloudBalance.exception.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    ResponseEntity<?> handleUserNotFoundException(UserNotFoundException e){
        ErrorResponseDTO error = new ErrorResponseDTO(
                HttpStatus.NOT_FOUND.value(),
                e.getMessage()
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    ResponseEntity<?> handleEmailAlreadyExistException(EmailAlreadyExistsException e){
        ErrorResponseDTO error = new ErrorResponseDTO(
                HttpStatus.CONFLICT.value(),
                e.getMessage()
        );
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(SessionExpiredException.class)
    ResponseEntity<?> handleSessionExpiredException(SessionExpiredException e){
        ErrorResponseDTO error = new ErrorResponseDTO(
                HttpStatus.UNAUTHORIZED.value(),
                e.getMessage()
        );
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }


}
