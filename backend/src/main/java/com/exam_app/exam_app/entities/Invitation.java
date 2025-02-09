package com.exam_app.exam_app.entities;

import com.exam_app.exam_app.repositories.InvitationRepo;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Optional;
import java.util.UUID;

@Entity
@Data
public class Invitation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer InvitationId;

    @Column(nullable = false)
    private String email; // Email of the invited user

    private String token; // Unique token for the invitation
    @PrePersist
    public void generateToken() {
        this.token = UUID.randomUUID().toString();  // Generates unique token
    }

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
