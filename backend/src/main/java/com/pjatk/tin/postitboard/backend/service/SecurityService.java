package com.pjatk.tin.postitboard.backend.service;

import com.pjatk.tin.postitboard.backend.model.User;
import com.pjatk.tin.postitboard.backend.repository.BoardRepository;
import com.pjatk.tin.postitboard.backend.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SecurityService {

    private final BoardRepository boardRepository;
    private final PostRepository postRepository;


    public Boolean isPostOwner(Long postId) {

        User currentUser = getCurrentUser();

        return postRepository.findById(postId).map(post -> post.getCreator().equals(currentUser)).orElse(false);

    }

    public boolean isBoardOwner(Long boardId) {

        User currentUser = getCurrentUser();

        return boardRepository.findById(boardId).map(board -> board.getCreator().equals(currentUser)).orElse(false);

    }

    public User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }


}
