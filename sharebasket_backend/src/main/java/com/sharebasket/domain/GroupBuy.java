package com.sharebasket.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
public class GroupBuy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String category;


    private String title;

    @Column(length = 1000)
    private String description;
    private String imageUrl;

    private String location;

    private int currentParticipants;
    private int pricePerPerson;

    private LocalDateTime deadline; // 
    private int price;

    @Column(name = "max_participants")
    private int maxParticipants;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "groupBuy", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @ManyToMany
    @JoinTable(
        name = "group_buy_participants",
        joinColumns = @JoinColumn(name = "group_buy_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> participants = new ArrayList<>();


    private int totalPrice;

}
