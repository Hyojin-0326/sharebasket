package com.sharebasket.dto;
import lombok.Data;

@Data
public class CommentDto {
    private Long id;
    private String author;
    private String text;
    private String time;
}