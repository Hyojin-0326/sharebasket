package com.sharebasket.service;

import com.sharebasket.domain.GroupBuy;
import com.sharebasket.dto.GroupBuyRequestDto;
import com.sharebasket.dto.GroupBuyResponseDto;  
import com.sharebasket.repository.GroupBuyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GroupBuyService {

    private final GroupBuyRepository groupBuyRepository;

    public GroupBuy createGroupBuy(GroupBuyRequestDto dto) {
        GroupBuy gb = new GroupBuy();
        gb.setTitle(dto.getTitle());
        gb.setDescription(dto.getDescription());
        gb.setLocation(dto.getLocation());
        gb.setMaxParticipants(dto.getMaxParticipants());
        gb.setCurrentParticipants(1);
        gb.setPricePerPerson(dto.getPricePerPerson());
        gb.setDeadline(LocalDateTime.parse(dto.getDeadline()));
        gb.setImageUrl(dto.getImageUrl());
        gb.setCategory(dto.getCategory());
        return groupBuyRepository.save(gb);
    }

    // ↓ 여기에 추가
    public List<GroupBuyResponseDto> getAllGroupBuys() {
        return groupBuyRepository.findAll().stream()
            .map(g -> new GroupBuyResponseDto(
                 g.getId(),
                 g.getTitle(),
                 g.getDescription(),
                 g.getCategory(),    // 도메인에 category 필드가 있어야 함
                 g.getImageUrl()
            ))
            .collect(Collectors.toList());
    }

    public Optional<GroupBuyResponseDto> getGroupBuyById(Long id) {
        return groupBuyRepository.findById(id)
            .map(g -> new GroupBuyResponseDto(
                 g.getId(),
                 g.getTitle(),
                 g.getDescription(),
                 g.getCategory(),
                 g.getImageUrl()
            ));
    }
}
