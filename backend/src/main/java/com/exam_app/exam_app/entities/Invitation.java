package com.exam_app.exam_app.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;
import java.util.UUID;

@Entity
@Data
public class Invitation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer invitationId;

    @ElementCollection
    private List<String> invitedEmails; // Store selected users' emails

    private String token; // Unique quiz invitation token

    @PrePersist
    public void generateToken() {
        this.token = UUID.randomUUID().toString(); // Generates a unique token
    }

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;
}
