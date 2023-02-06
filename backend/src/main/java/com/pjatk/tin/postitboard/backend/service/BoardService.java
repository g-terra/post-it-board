package com.pjatk.tin.postitboard.backend.service;

import com.pjatk.tin.postitboard.backend.controller.response.BoardDetailsResponse;
import com.pjatk.tin.postitboard.backend.model.Board;
import com.pjatk.tin.postitboard.backend.model.User;
import com.pjatk.tin.postitboard.backend.repository.BoardRepository;
import com.pjatk.tin.postitboard.backend.controller.request.NewBoardRequest;
import com.pjatk.tin.postitboard.backend.controller.response.BoardsResponse;
import com.pjatk.tin.postitboard.backend.controller.response.NewBoardResponse;
import com.pjatk.tin.postitboard.backend.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final SecurityService securityService;
    private final PostRepository postRepository;

    public BoardsResponse getBoards(int pageSize, int page, String search) {

        Pageable pageable = PageRequest.of(page, pageSize);

        User currentUser = securityService.getCurrentUser();

        Page<Board> allByCreator = boardRepository.findAllByCreatorAndNameContaining(currentUser, search, pageable);

        return BoardsResponse.from(allByCreator);
    }

    @Transactional
    public NewBoardResponse createBoard(NewBoardRequest request) {

        Board newBoard = request.toBoard();

        User creator = securityService.getCurrentUser();

        newBoard.setCreator(creator);

        return NewBoardResponse.from(boardRepository.save(newBoard));
    }

    @Transactional
    public void deleteBoard(Long boardId) {

        Board board = getBoard(boardId);

        postRepository.removeAllByBoard(board);

        boardRepository.delete(board);

    }

    public Board getBoard(Long boardId) {

        return boardRepository.findById(boardId).orElseThrow(
                () -> new ResourceNotFoundException("Board not found")
        );
    }

    public BoardDetailsResponse getBoardDetails(Long boardId) {

        return BoardDetailsResponse.from(getBoard(boardId));

    }

}
