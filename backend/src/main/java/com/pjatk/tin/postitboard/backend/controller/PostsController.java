package com.pjatk.tin.postitboard.backend.controller;

import com.pjatk.tin.postitboard.backend.controller.request.AddPostToBoardRequest;
import com.pjatk.tin.postitboard.backend.controller.response.PostsByBoardResponse;
import com.pjatk.tin.postitboard.backend.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostsController {


    private final PostService postService;

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("@securityService.isBoardOwner(#boardId)")
    public PostsByBoardResponse getPosts(
            @RequestParam Long boardId,
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "pageSize", defaultValue = "15") Integer pageSize,
            @RequestParam(value = "search", defaultValue = "") String search
    ) {
        return postService.getPosts(boardId, pageSize, page ,search);
    }


    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    @PreAuthorize("@securityService.isBoardOwner(#request.board)")
    public void createPost(@Valid @RequestBody AddPostToBoardRequest request) {
        postService.createPost(request);
    }

    @DeleteMapping
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @PreAuthorize("@securityService.isPostOwner(#postId)")
    public void deletePost(@RequestParam Long postId) {
        postService.deletePost(postId);
    }

}
