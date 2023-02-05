package com.pjatk.tin.postitboard.backend.controller.response;

import com.pjatk.tin.postitboard.backend.model.Board;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class BoardDetailsResponse {

    private String name;

    public static BoardDetailsResponse from(Board board) {
        return BoardDetailsResponse.builder()
                .name(board.getName())
                .build();
    }
}
