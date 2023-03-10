package com.pjatk.tin.postitboard.backend.repository;

import com.pjatk.tin.postitboard.backend.model.Board;
import com.pjatk.tin.postitboard.backend.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    Page<Post> findAllByBoardId(Long boardId , Pageable pageable);
    Page<Post> findAllByBoardIdAndContentContains(Long boardId ,String search, Pageable pageable);



    void removeAllByBoard(Board board);

}
