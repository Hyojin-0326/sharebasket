package com.sharebasket.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class GroupBuy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;
    private String imageUrl;
 
    private String location;
    private int maxParticipants;
    private int currentParticipants;
    private int pricePerPerson;

    private LocalDateTime deadline;

    @Column(nullable = false)
    private String category;
}
