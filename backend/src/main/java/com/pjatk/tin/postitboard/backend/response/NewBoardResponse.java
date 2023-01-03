package com.pjatk.tin.postitboard.backend.response;

import com.pjatk.tin.postitboard.backend.domain.Board;
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
