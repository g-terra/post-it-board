package com.pjatk.tin.postitboard.backend.response;

import com.pjatk.tin.postitboard.backend.domain.Post;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@Builder
public class PostsByBoardResponse {

    private List<PostView> posts;

    private int totalPages;

    private int currentPage;

    private int pageSize;

    public static PostsByBoardResponse from(Page<Post> posts) {

        return PostsByBoardResponse.builder()
                .posts(posts.getContent().stream().map(PostView::from).collect(java.util.stream.Collectors.toList()))
                .totalPages(posts.getTotalPages())
                .pageSize(posts.getSize())
                .build();

    }

    @Data
    @Builder
    public static class PostView {

        private Long id;

        private String title;

        private String content;

        private String creator;

        private String color;

        private String createdAt;


        public static PostView from(Post post) {
            return PostView.builder()
                    .id(post.getId())
                    .title(post.getTitle())
                    .color(post.getColor())
                    .content(post.getContent())
                    .creator(post.getCreator().getFirstName() + " " + post.getCreator().getLastName())
                    .createdAt(
                              String.format("%02d-%02d-%d %02d:%02d",
                                        post.getCreationDate().getDayOfMonth(),
                                        post.getCreationDate().getMonthValue(),
                                        post.getCreationDate().getYear(),
                                        post.getCreationDate().getHour(),
                                        post.getCreationDate().getMinute()
                                )
                    )
                    .build();
        }

    }





}
