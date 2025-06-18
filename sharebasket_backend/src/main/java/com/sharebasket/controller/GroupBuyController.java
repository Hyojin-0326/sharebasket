package com.sharebasket.controller;

import com.sharebasket.dto.GroupBuyRequestDto;
import com.sharebasket.dto.GroupBuyResponseDto;
import com.sharebasket.dto.JoinRequest;
import com.sharebasket.service.GroupBuyService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/groupbuys")
@RequiredArgsConstructor
public class GroupBuyController {

    private final GroupBuyService groupBuyService;

    @GetMapping
    public List<GroupBuyResponseDto> getAllGroupBuys() {
        return groupBuyService.getAllGroupBuys();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GroupBuyResponseDto> getGroupBuyById(@PathVariable Long id) {
        return groupBuyService.getGroupBuyById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<GroupBuyResponseDto> create(@RequestBody GroupBuyRequestDto dto) {
        var saved = groupBuyService.createGroupBuy(dto);

        var resDto = new GroupBuyResponseDto();
        resDto.setId(saved.getId());
        resDto.setTitle(saved.getTitle());
        resDto.setDescription(saved.getDescription());
        resDto.setCategory(saved.getCategory());
        resDto.setImageUrl(saved.getImageUrl());
        resDto.setUserName(saved.getUser().getName());
        resDto.setUserAvatar(saved.getUser().getAvatar());
        resDto.setUserTrustScore(saved.getUser().getTrustScore());
        resDto.setUserReviewCount(saved.getUser().getReviewCount());

        return ResponseEntity.status(HttpStatus.CREATED).body(resDto);
    }

    @PostMapping("/api/groupbuys/{id}/join")
    public ResponseEntity<?> joinGroupBuy(@PathVariable Long id, @RequestBody JoinRequest request) {
    groupBuyService.addParticipant(id, request.getUserId());
    return ResponseEntity.ok().build();
}

}
