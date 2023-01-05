package com.pjatk.tin.postitboard.backend.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.Singular;

import java.util.List;

@Data
@Builder
@RequiredArgsConstructor
public class ErrorResponse {

    private final String message;
    @Singular
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private final List<Cause> causes;

}

