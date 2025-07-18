// domain/User.java
package com.sharebasket.domain;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "users") 
@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String password;
    private String name;

    private String avatar;      // ex) 'K'
    private int trustScore;     // ex) 87
    private int reviewCount;    // ex) 23

    @ManyToOne
    @JoinColumn(name = "group_buy_id")
    private GroupBuy groupBuy;
}
