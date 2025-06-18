// src/main/java/com/sharebasket/dto/ParticipantDto.java
package com.sharebasket.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.io.Serializable;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParticipantDto {
    private Long id;
    private String name;
    private String avatar;
}
