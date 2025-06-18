// src/main/java/com/sharebasket/service/GroupBuyService.java
package com.sharebasket.service;

import com.sharebasket.domain.User;
import com.sharebasket.domain.GroupBuy;
import com.sharebasket.domain.Comment;
import com.sharebasket.dto.CommentDto;
import com.sharebasket.dto.GroupBuyRequestDto;
import com.sharebasket.dto.GroupBuyResponseDto;
import com.sharebasket.dto.OrganizerDto;
import com.sharebasket.dto.ParticipantDto;
import com.sharebasket.repository.GroupBuyRepository;
import com.sharebasket.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import java.time.Duration;
import java.time.LocalDateTime;

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

                LocalDateTime now = LocalDateTime.now();
                LocalDateTime deadline = g.getDeadline();
                String remaining = "";

                if (deadline != null) {
                    long hours = Duration.between(now, deadline).toHours();
                    remaining = hours > 0 ? hours + " Remaining" : "Closed ";
                } else {
                    remaining = "Undefined";
                }

                dto.setTimeRemaining(remaining);

                dto.setCurrentParticipants(g.getParticipants().size());
                dto.setMaxParticipants(g.getMaxParticipants());

                // organizer 설정
                User u = g.getUser();
                OrganizerDto organizerDto = new OrganizerDto(
                    u.getId(),
                    u.getName(),
                    u.getAvatar(),
                    u.getTrustScore(),
                    u.getReviewCount()
                );
                dto.setOrganizer(organizerDto);

                // 참여자 리스트에 대표자 포함
                List<ParticipantDto> participants = Arrays.asList(
                    new ParticipantDto(
                        u.getId(),
                        u.getName(),
                        u.getAvatar()
                    )
                );
                dto.setParticipants(participants);
                dto.setCurrentParticipants(participants.size()); 


                // 가격 표시
                dto.setTotalPrice(g.getTotalPrice());
                dto.setPricePerPerson(g.getPricePerPerson());

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

                LocalDateTime now = LocalDateTime.now();
                LocalDateTime deadline = g.getDeadline();
                String remaining = "";

                if (deadline != null) {
                    long hours = Duration.between(now, deadline).toHours();
                    remaining = hours > 0 ? hours + "   Hour" : "Closed";
                } else {
                    remaining = "Undefined";
                }

                dto.setTimeRemaining(remaining);

                dto.setCurrentParticipants(g.getParticipants().size());
                dto.setMaxParticipants(g.getMaxParticipants());

                // organizer 설정
                User u = g.getUser();
                OrganizerDto organizerDto = new OrganizerDto(
                    u.getId(),
                    u.getName(),
                    u.getAvatar(),
                    u.getTrustScore(),
                    u.getReviewCount()
                );
                dto.setOrganizer(organizerDto);

                // 참여자 리스트에 대표자 포함
                List<ParticipantDto> participants = Arrays.asList(
                    new ParticipantDto(
                        u.getId(),
                        u.getName(),
                        u.getAvatar()
                    )
                );
                dto.setParticipants(participants);
                dto.setCurrentParticipants(participants.size());

                // 댓글 세팅
                dto.setComments(g.getComments().stream().map(comment -> {
                    CommentDto cdto = new CommentDto();
                    cdto.setId(comment.getId());
                    cdto.setAuthor(comment.getAuthor());
                    cdto.setText(comment.getText());
                    cdto.setTime(comment.getTime());
                    return cdto;
                }).collect(Collectors.toList()));

                // 가격 표시
                dto.setTotalPrice(g.getTotalPrice());
                dto.setPricePerPerson(g.getPricePerPerson());

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
        gb.setTotalPrice(dto.getTotalPrice());
        gb.setMaxParticipants(dto.getMaxParticipants());
        gb.setCurrentParticipants(1);
        gb.setPricePerPerson(dto.getPricePerPerson());
        gb.setDeadline(LocalDateTime.parse(dto.getDeadline()));

        User user = userRepository.findById(dto.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));
        gb.setUser(user);

        return groupBuyRepository.save(gb);
    }
    public void addParticipant(Long groupBuyId, Long userId) {
    GroupBuy gb = groupBuyRepository.findById(groupBuyId)
        .orElseThrow(() -> new RuntimeException("공동구매 없음"));

    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("유저 없음"));

    // 중복 참여 방지
    if (!gb.getParticipants().contains(user)) {
        gb.getParticipants().add(user);
        gb.setCurrentParticipants(gb.getParticipants().size());
        groupBuyRepository.save(gb);
    }
}
}
