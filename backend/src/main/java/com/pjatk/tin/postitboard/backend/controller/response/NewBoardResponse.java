package com.pjatk.tin.postitboard.backend.controller.response;

import com.pjatk.tin.postitboard.backend.model.Board;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewBoardResponse {

    private Long id;
    private String name;

    public static NewBoardResponse from(Board save) {
        return NewBoardResponse.builder()
                .id(save.getId())
                .name(save.getName())
                .build();
    }
}
