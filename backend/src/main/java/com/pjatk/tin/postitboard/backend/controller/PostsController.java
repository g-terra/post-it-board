package com.pjatk.tin.postitboard.backend.controller;

import com.pjatk.tin.postitboard.backend.response.PostsByBoardResponse;
import com.pjatk.tin.postitboard.backend.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostsController {


    private final BoardService boardService;

    @GetMapping()
    public PostsByBoardResponse getPosts(Principal principal, @RequestParam Long boardId) {
        return boardService.getPosts(principal, boardId);
    }

}
