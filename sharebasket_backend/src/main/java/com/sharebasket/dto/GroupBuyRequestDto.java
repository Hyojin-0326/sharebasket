package com.sharebasket.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GroupBuyRequestDto {
    private String title;
    private String description;
    private String location;
    private int maxParticipants;
    private int pricePerPerson;
    private String deadline;  // → 나중에 LocalDateTime으로 파싱
    private String imageUrl;
    private String category;
    private Long userId;
    private int totalPrice;

    // private String tag;
}
