package com.pjatk.tin.postitboard.backend.controller;


import com.pjatk.tin.postitboard.backend.request.NewBoardRequest;
import com.pjatk.tin.postitboard.backend.response.BoardsResponse;
import com.pjatk.tin.postitboard.backend.response.NewBoardResponse;
import com.pjatk.tin.postitboard.backend.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/boards")
@Slf4j
public class BoardsController {

    private final BoardService boardsService;

    @GetMapping
    public BoardsResponse getBoards(
            Principal principal,
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "pageSize", defaultValue = "15") Integer pageSize,
            @RequestParam(value = "search", defaultValue = "") String search

    ) {

        return boardsService.getBoards(principal, pageSize, page, search);
    }


    @PostMapping
    public NewBoardResponse createBoard(Principal principal, @RequestBody NewBoardRequest request) {
        return boardsService.createBoard(principal, request);
    }


}
