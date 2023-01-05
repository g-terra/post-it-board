package com.pjatk.tin.postitboard.backend.controller.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddPostToBoardRequest {

    @NotNull(message = "Board is required")
    private Long board;
    @NotEmpty(message = "Post content cannot be empty")
    @Length(min = 1, max = 255 , message = "Content must be between 1 and 255 characters")
    private String content;

    @NotEmpty(message = "Post color cannot be empty")
    private String color;



}
