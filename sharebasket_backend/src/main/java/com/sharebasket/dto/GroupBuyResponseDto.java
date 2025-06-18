package com.sharebasket.dto;
import java.util.List;   
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
    private String userName;
    private String userAvatar;
    private int userTrustScore;
    private int userReviewCount;
    private List<ParticipantDto> participants;
    private List<CommentDto> comments;
    private OrganizerDto organizer;

    private int currentParticipants; // 참여자 정보 추가
    private int maxParticipants;
        

    
}
