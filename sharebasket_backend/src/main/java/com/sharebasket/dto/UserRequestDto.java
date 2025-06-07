package com.sharebasket.dto;

import lombok.Data;

@Data
public class UserRequestDto {
    private String email;
    private String password;
    private String name; // 로그인일 때는 없어도 됨
}
