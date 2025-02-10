package com.exam_app.exam_app.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Response {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer responseId;

    @ManyToOne
    private Question question;

    private String userOption;

    @ManyToOne
    private User user;
}
