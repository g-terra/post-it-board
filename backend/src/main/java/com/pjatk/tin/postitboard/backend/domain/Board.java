package com.pjatk.tin.postitboard.backend.domain;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity(name = "boards")
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "board" , cascade = CascadeType.ALL , fetch = FetchType.EAGER)
    @ToString.Exclude
    private List<Post> posts;

    @ManyToOne
    private User creator;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Board board = (Board) o;
        return id != null && Objects.equals(id, board.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
