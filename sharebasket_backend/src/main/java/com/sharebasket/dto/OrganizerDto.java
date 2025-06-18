// OrganizerDto.java (new file)
package com.sharebasket.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrganizerDto {
    private Long id;
    private String name;
    private String avatar;
    private int trustScore;
    private int reviewCount;
    // private List<ReviewDto> recentReviews; 일단생략..
}
