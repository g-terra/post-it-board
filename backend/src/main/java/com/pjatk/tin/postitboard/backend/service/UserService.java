package com.pjatk.tin.postitboard.backend.service;

import com.pjatk.tin.postitboard.backend.domain.User;
import com.pjatk.tin.postitboard.backend.repository.UserRepository;
import com.pjatk.tin.postitboard.backend.request.RegistrationRequest;
import com.pjatk.tin.postitboard.backend.response.RegistrationResponse;
import lombok.RequiredArgsConstructor;
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

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);

        return RegistrationResponse.from(user);

    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username);
    }
}
