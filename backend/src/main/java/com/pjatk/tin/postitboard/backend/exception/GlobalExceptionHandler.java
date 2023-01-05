package com.pjatk.tin.postitboard.backend.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;


@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ErrorResponse handleValidationExceptions(MethodArgumentNotValidException ex) {

        log.debug("Validation exception", ex);

        BindingResult result = ex.getBindingResult();
        List<FieldError> fieldErrors = result.getFieldErrors();


        List<Cause> mappedCauses = fieldErrors.stream()
                .map(fieldError -> Cause.builder()
                        .identifier(fieldError.getField())
                        .message(fieldError.getDefaultMessage())
                        .build())
                .collect(Collectors.toList());

        return new ErrorResponse("Validation error", mappedCauses);


    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(AccessDeniedException.class)
    public ErrorResponse handleAccessDeniedException(AccessDeniedException ex) {
        log.warn("Access denied", ex);
        return ErrorResponse.builder()
                .message("Access denied")
                .cause(Cause.builder()
                        .message(ex.getMessage())
                        .build())
                .build();
    }


    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ResourceNotFoundException.class)
    public ErrorResponse handleResourceNotFoundException(ResourceNotFoundException ex) {

        log.warn("Resource not found", ex);

        return ErrorResponse.builder()
                .message("Resource not found")
                .cause(Cause.builder()
                        .message(ex.getMessage())
                        .build())
                .build();
    }


    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalArgumentException.class)
    public ErrorResponse handleIllegalArgumentException(IllegalArgumentException ex) {

        log.warn("Illegal argument", ex);

        return ErrorResponse.builder()
                .message("Illegal argument")
                .cause(Cause.builder()
                        .message(ex.getMessage())
                        .build())
                .build();
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleException(Exception ex) {
        log.error("Internal server error", ex);
        return ErrorResponse.builder()
                .message("Internal server error")
                .cause(Cause.builder()
                        .message(ex.getMessage())
                        .build())
                .build();
    }


}
