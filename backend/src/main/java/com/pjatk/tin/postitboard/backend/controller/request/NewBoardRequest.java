package com.pjatk.tin.postitboard.backend.controller.request;


import com.pjatk.tin.postitboard.backend.model.Board;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NewBoardRequest {

    @NotEmpty(message = "Board name cannot be empty")
    private String name;


    public Board toBoard() {
        return Board.builder()
                .name(name)
                .build();
    }

}
