package com.pjatk.tin.postitboard.backend.service;

import com.pjatk.tin.postitboard.backend.controller.request.AddPostToBoardRequest;
import com.pjatk.tin.postitboard.backend.controller.response.PostsByBoardResponse;
import com.pjatk.tin.postitboard.backend.model.Board;
import com.pjatk.tin.postitboard.backend.model.Post;
import com.pjatk.tin.postitboard.backend.model.User;
import com.pjatk.tin.postitboard.backend.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Service
@RequiredArgsConstructor
@Slf4j
public class PostService {

    private final PostRepository postRepository;
    private final BoardService boardService;
    private final SecurityService securityService;

    public PostsByBoardResponse getPosts(Long boardId, int pageSize, int page, String search) {

        Page<Post> posts = postRepository.findAllByBoardIdAndContentContains(boardId, search, PageRequest.of(page, pageSize));

        return PostsByBoardResponse.from(posts);
    }


    @Transactional
    public void createPost(AddPostToBoardRequest request) {

        Board board = boardService.getBoard(request.getBoard());

        User creator = securityService.getCurrentUser();

        Post post = Post.builder()
                .board(board)
                .creator(creator)
                .content(request.getContent())
                .color(request.getColor())
                .build();

        postRepository.save(post);

    }

    @Transactional
    public void deletePost(Long postId) {
        log.info("Deleting post with id: {}", postId);
        postRepository.deleteById(postId);
    }


}
