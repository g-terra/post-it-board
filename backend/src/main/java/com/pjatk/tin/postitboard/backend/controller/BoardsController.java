package com.pjatk.tin.postitboard.backend.controller;


import com.pjatk.tin.postitboard.backend.controller.request.NewBoardRequest;
import com.pjatk.tin.postitboard.backend.controller.response.BoardsResponse;
import com.pjatk.tin.postitboard.backend.controller.response.NewBoardResponse;
import com.pjatk.tin.postitboard.backend.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/boards")
@Slf4j
public class BoardsController {

    private final BoardService boardsService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public BoardsResponse getBoards(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "pageSize", defaultValue = "15") Integer pageSize,
            @RequestParam(value = "search", defaultValue = "") String search

    ) {
        return boardsService.getBoards(pageSize, page, search);
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public NewBoardResponse createBoard(@RequestBody NewBoardRequest request) {
        return boardsService.createBoard(request);
    }

    @DeleteMapping
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @PreAuthorize("@securityService.isBoardOwner(#boardId)")
    public void deleteBoard(@RequestParam Long boardId) {
        boardsService.deleteBoard(boardId);
    }


}
