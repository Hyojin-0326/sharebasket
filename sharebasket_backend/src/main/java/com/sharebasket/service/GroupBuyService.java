// src/main/java/com/sharebasket/service/GroupBuyService.java
package com.sharebasket.service;
import com.sharebasket.domain.User;

import com.sharebasket.domain.GroupBuy;
import com.sharebasket.dto.CommentDto;
import com.sharebasket.domain.Comment;
import com.sharebasket.dto.GroupBuyRequestDto;
import com.sharebasket.dto.GroupBuyResponseDto;
import com.sharebasket.dto.ParticipantDto;
import com.sharebasket.repository.GroupBuyRepository;
import com.sharebasket.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.stream.Collectors;




@Service
@RequiredArgsConstructor
public class GroupBuyService {

    private final GroupBuyRepository groupBuyRepository;
    private final UserRepository userRepository;

    public List<GroupBuyResponseDto> getAllGroupBuys() {
        return groupBuyRepository.findAll().stream()
            .map(g -> {
                GroupBuyResponseDto dto = new GroupBuyResponseDto();
                dto.setId(g.getId());
                dto.setTitle(g.getTitle());
                dto.setDescription(g.getDescription());
                dto.setCategory(g.getCategory());
                dto.setImageUrl(g.getImageUrl());
                dto.setUserName(g.getUser().getName());
                dto.setUserAvatar(g.getUser().getAvatar());
                dto.setUserTrustScore(g.getUser().getTrustScore());
                dto.setUserReviewCount(g.getUser().getReviewCount());

                // 작성자 한 명을 참여자 리스트에 포함
                List<ParticipantDto> participants = Arrays.asList(
                    new ParticipantDto(
                        g.getUser().getId(),
                        g.getUser().getName(),
                        g.getUser().getAvatar()
                    )
                );
                dto.setParticipants(participants);

                return dto;
            })
            .collect(Collectors.toList());
    }

public Optional<GroupBuyResponseDto> getGroupBuyById(Long id) {
    return groupBuyRepository.findById(id)
        .map(g -> {
            GroupBuyResponseDto dto = new GroupBuyResponseDto();
            dto.setId(g.getId());
            dto.setTitle(g.getTitle());
            dto.setDescription(g.getDescription());
            dto.setCategory(g.getCategory());
            dto.setImageUrl(g.getImageUrl());
            dto.setUserName(g.getUser().getName());
            dto.setUserAvatar(g.getUser().getAvatar());
            dto.setUserTrustScore(g.getUser().getTrustScore());
            dto.setUserReviewCount(g.getUser().getReviewCount());

            List<ParticipantDto> participants = Arrays.asList(
                new ParticipantDto(
                    g.getUser().getId(),
                    g.getUser().getName(),
                    g.getUser().getAvatar()
                )
            );
            dto.setParticipants(participants);

            dto.setComments(g.getComments().stream().map(comment -> {
                CommentDto cdto = new CommentDto();
                cdto.setId(comment.getId());
                cdto.setAuthor(comment.getAuthor());
                cdto.setText(comment.getText());
                cdto.setTime(comment.getTime());
                return cdto;
            }).collect(Collectors.toList()));

            return dto;
        });
}


    
    public GroupBuy createGroupBuy(GroupBuyRequestDto dto) {
        GroupBuy gb = new GroupBuy();
        gb.setTitle(dto.getTitle());
        gb.setDescription(dto.getDescription());
        gb.setCategory(dto.getCategory());
        gb.setImageUrl(dto.getImageUrl());
        gb.setLocation(dto.getLocation());
        gb.setPrice(dto.getPrice());
        gb.setMaxParticipants(dto.getMaxParticipants());
        gb.setCurrentParticipants(1);
        gb.setPricePerPerson(dto.getPricePerPerson());
        gb.setDeadline(LocalDateTime.parse(dto.getDeadline()));

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        gb.setUser(user);

        return groupBuyRepository.save(gb);
    }
}
