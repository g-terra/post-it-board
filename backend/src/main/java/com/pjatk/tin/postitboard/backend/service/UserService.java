package com.pjatk.tin.postitboard.backend.service;

import com.pjatk.tin.postitboard.backend.model.User;
import com.pjatk.tin.postitboard.backend.repository.UserRepository;
import com.pjatk.tin.postitboard.backend.controller.request.RegistrationRequest;
import com.pjatk.tin.postitboard.backend.controller.response.RegistrationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Transactional
    public RegistrationResponse register(RegistrationRequest request) {

        User user = request.toUser();

        userRepository.findByEmail(user.getEmail()).ifPresent(u -> {
            throw new IllegalArgumentException("User with email " + user.getEmail() + " already exists");
        });

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);

        return RegistrationResponse.from(user);

    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException("User with email " + email + " not found"));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username).
                orElseThrow(() -> new UsernameNotFoundException("User with email " + username + " not found"));
    }


}
