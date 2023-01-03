package com.pjatk.tin.postitboard.backend.request;


import com.pjatk.tin.postitboard.backend.domain.Board;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NewBoardRequest {

    @NotNull
    private String name;


    public Board toBoard() {
        return Board.builder()
                .name(name)
                .build();
    }

}
