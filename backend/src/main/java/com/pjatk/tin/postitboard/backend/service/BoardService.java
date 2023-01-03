package com.pjatk.tin.postitboard.backend.service;

import com.pjatk.tin.postitboard.backend.domain.Board;
import com.pjatk.tin.postitboard.backend.domain.Post;
import com.pjatk.tin.postitboard.backend.domain.User;
import com.pjatk.tin.postitboard.backend.repository.BoardRepository;
import com.pjatk.tin.postitboard.backend.repository.PostRepository;
import com.pjatk.tin.postitboard.backend.repository.UserRepository;
import com.pjatk.tin.postitboard.backend.request.NewBoardRequest;
import com.pjatk.tin.postitboard.backend.response.BoardsResponse;
import com.pjatk.tin.postitboard.backend.response.NewBoardResponse;
import com.pjatk.tin.postitboard.backend.response.PostsByBoardResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.Principal;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public BoardsResponse getBoards(Principal principal, int pageSize, int page, String search) {

        Pageable pageable = PageRequest.of(page, pageSize);

        User user = userRepository.findByEmail(principal.getName());

        Page<Board> allByCreator = boardRepository.findAllByCreatorAndNameContaining(user, search, pageable);

        return BoardsResponse.from(allByCreator);
    }

    @Transactional
    public NewBoardResponse createBoard(Principal principal, NewBoardRequest request) {

        Board newBoard = request.toBoard();

        User user = userRepository.findByEmail(principal.getName());

        newBoard.setCreator(user);

        return NewBoardResponse.from(boardRepository.save(newBoard));
    }

    public boolean isUserOwner(Principal principal, Long boardId) {
        User user = userRepository.findByEmail(principal.getName());
        Board board = boardRepository.findById(boardId).orElseThrow();
        return board.getCreator().equals(user);
    }


    public PostsByBoardResponse getPosts(Principal principal, Long boardId) {

        boolean userOwner = isUserOwner(principal, boardId);

        if (!userOwner) throw new AccessDeniedException("User is not owner of this board");

        Page<Post> posts = postRepository.findAllByBoardId(boardId, PageRequest.of(0, 10));

        return PostsByBoardResponse.from(posts);
    }
}
