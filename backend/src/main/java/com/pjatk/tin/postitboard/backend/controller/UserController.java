package com.pjatk.tin.postitboard.backend.controller;

import com.pjatk.tin.postitboard.backend.domain.User;
import com.pjatk.tin.postitboard.backend.request.RegistrationRequest;
import com.pjatk.tin.postitboard.backend.request.AuthenticationRequest;
import com.pjatk.tin.postitboard.backend.response.RegistrationResponse;
import com.pjatk.tin.postitboard.backend.response.AuthenticationResponse;
import com.pjatk.tin.postitboard.backend.security.JwtUtils;
import com.pjatk.tin.postitboard.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserService userService;

    @PostMapping("/register")
    public RegistrationResponse register(@RequestBody @Valid RegistrationRequest request) {
        return userService.register(request);
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @PostMapping("/token")
    public AuthenticationResponse tokenRequest(@RequestBody AuthenticationRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        User userDetails = (User) authentication.getPrincipal();

        return AuthenticationResponse.from(userDetails, jwt);
    }

}