package com.pjatk.tin.postitboard.backend.repository;

import com.pjatk.tin.postitboard.backend.domain.Board;
import com.pjatk.tin.postitboard.backend.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    Page<Board> findAllByCreator(User user, Pageable pageable);

    Page<Board> findAllByCreatorAndNameContaining(User user, String search, Pageable pageable);

}


