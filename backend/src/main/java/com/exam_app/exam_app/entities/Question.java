package com.exam_app.exam_app.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data  // NO need for getter and setter
@Entity
@Table(name = "question", uniqueConstraints = @UniqueConstraint(columnNames = "question_description"))
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
