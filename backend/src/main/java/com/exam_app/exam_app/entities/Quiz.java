package com.exam_app.exam_app.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer quizId;

    private String quizName;

    private Integer noOfQuestions;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "quiz_questions",  // Name of the join table
            joinColumns = @JoinColumn(name = "quizId"),   // Foreign key for Quiz
            inverseJoinColumns = @JoinColumn(name = "questionId")  // Foreign key for Question

    )
    private List<Question> questions = new ArrayList<>();

}
