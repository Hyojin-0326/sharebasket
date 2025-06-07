package com.sharebasket.controller;

import com.sharebasket.domain.GroupBuy;
import com.sharebasket.dto.GroupBuyRequestDto;
import com.sharebasket.service.GroupBuyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:8081"})
@RestController
@RequestMapping("/api/groupbuy")
@RequiredArgsConstructor
public class GroupBuyController {

    private final GroupBuyService groupBuyService;

    @PostMapping
    public ResponseEntity<GroupBuy> create(@RequestBody GroupBuyRequestDto dto) {
        GroupBuy created = groupBuyService.createGroupBuy(dto);
        return ResponseEntity.ok(created);
    }
}
