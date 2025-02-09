package com.exam_app.exam_app.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer resultId;

    @ManyToOne
    private User user;

    @ManyToOne
    private Quiz quiz;

    private Integer score;
}
