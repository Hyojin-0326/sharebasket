// controller/UserController.java
package com.sharebasket.controller;

import com.sharebasket.dto.UserRequestDto;
import com.sharebasket.dto.UserResponseDto;
import com.sharebasket.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@CrossOrigin(origins = {"http://localhost:3000","http://localhost:8081"})
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor



public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public UserResponseDto register(@RequestBody UserRequestDto dto) {
        return userService.register(dto);
    }

    @PostMapping("/login")
    public UserResponseDto login(@RequestBody UserRequestDto dto) {
        return userService.login(dto);
    }
    
    @GetMapping("/profile")
    public ResponseEntity<String> getProfile(HttpServletRequest request) {
    String email = (String) request.getAttribute("userEmail");

    if (email == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    return ResponseEntity.ok(email);
}
}
