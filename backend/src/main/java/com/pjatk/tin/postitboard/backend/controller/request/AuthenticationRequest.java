package com.pjatk.tin.postitboard.backend.controller.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticationRequest {

    @Email(message = "The provided email is not valid")
    private String email;


    @NotEmpty(message = "Password cannot be empty")
    private String password;

}
