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
}
