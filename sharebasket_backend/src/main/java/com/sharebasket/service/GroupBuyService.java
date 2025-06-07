package com.sharebasket.service;

import com.sharebasket.domain.GroupBuy;
import com.sharebasket.dto.GroupBuyRequestDto;
import com.sharebasket.repository.GroupBuyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

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
        gb.setCurrentParticipants(1); // 생성자가 1명 참가한 걸로
        gb.setPricePerPerson(dto.getPricePerPerson());
        gb.setDeadline(LocalDateTime.parse(dto.getDeadline())); // ISO 8601 파싱
        gb.setImageUrl(dto.getImageUrl());

        return groupBuyRepository.save(gb);
    }
}
