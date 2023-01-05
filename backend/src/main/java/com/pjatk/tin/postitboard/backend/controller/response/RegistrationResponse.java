package com.pjatk.tin.postitboard.backend.controller.response;

import com.pjatk.tin.postitboard.backend.model.User;
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
