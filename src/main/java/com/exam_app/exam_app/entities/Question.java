package com.exam_app.exam_app.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data  // NO need for getter and setter
@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String questionDescription;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String correctOption;
    private String difficultyLevel;
    private String category;
}
