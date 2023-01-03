package com.pjatk.tin.postitboard.backend.response;

import com.pjatk.tin.postitboard.backend.domain.User;
import lombok.Builder;
import lombok.Data;


@Builder
@Data
public class RegistrationResponse {

    private Long id;

    public static RegistrationResponse from(User user) {
        return RegistrationResponse.builder().
                id(user.getId())
                .build();


    }

}
