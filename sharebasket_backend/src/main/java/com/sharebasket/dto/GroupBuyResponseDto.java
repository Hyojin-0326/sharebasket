package com.sharebasket.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupBuyResponseDto {
    private Long id;
    private String title;
    private String description;
    private String category;
    private String imageUrl;
}
