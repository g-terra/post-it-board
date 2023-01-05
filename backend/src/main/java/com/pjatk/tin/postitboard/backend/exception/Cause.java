package com.pjatk.tin.postitboard.backend.exception;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Cause {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String identifier;
    private String message;

}
