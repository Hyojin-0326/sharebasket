package com.sharebasket.service;

import com.sharebasket.dto.UserRequestDto;
import com.sharebasket.dto.UserResponseDto;
import com.sharebasket.domain.User;
import com.sharebasket.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponseDto register(UserRequestDto dto) {
        User user = User.builder()
                .email(dto.getEmail())
                .password(dto.getPassword())
                .name(dto.getName())
                .build();

        userRepository.save(user);

        return new UserResponseDto(user.getId(), user.getEmail(), user.getName());
    }

    public UserResponseDto login(UserRequestDto dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("이메일이 존재하지 않습니다."));

        if (!user.getPassword().equals(dto.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        return new UserResponseDto(user.getId(), user.getEmail(), user.getName());
    }
}
