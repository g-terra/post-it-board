package com.pjatk.tin.postitboard.backend.response;

import com.pjatk.tin.postitboard.backend.domain.User;
import lombok.*;

@Builder
@Data
public class AuthenticationResponse {

    private String jwt;

    private AuthenticatedUserDetails user;

    public static AuthenticationResponse from(User user, String jwt) {
        return AuthenticationResponse.builder()
                .user(AuthenticatedUserDetails.from(user))
                .jwt(jwt)
                .build();
    }

    @Builder
    @Data
    public static class AuthenticatedUserDetails{

        private String firstName;

        private String lastName;

        private String email;

        public static AuthenticatedUserDetails from(User user) {
            return AuthenticatedUserDetails.builder()
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .email(user.getEmail())
                    .build();
        }

    }

}
