package com.pjatk.tin.postitboard.backend.response;

import com.pjatk.tin.postitboard.backend.domain.Board;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class BoardsResponse {

    private List<BoardView> boards;

    private int totalPages;

    private int currentPage;

    private int pageSize;

    public static BoardsResponse from(Page<Board> boards) {

        return BoardsResponse.builder()
                .boards(boards.getContent().stream().map(BoardView::from).collect(Collectors.toList()))
                .totalPages(boards.getTotalPages())
                .pageSize(boards.getSize())
                .build();

    }

    @Builder
    @Data
    public static class BoardView {

        private Long id;
        private String name;

        private int postsCount;

        public static BoardView from(Board board) {
            return BoardView.builder()
                    .id(board.getId())
                    .name(board.getName())
                    .postsCount(board.getPosts().size())
                    .build();
        }

    }

}
