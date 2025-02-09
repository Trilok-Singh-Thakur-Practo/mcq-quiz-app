package com.exam_app.exam_app.controllers;

import com.exam_app.exam_app.entities.Quiz;
import com.exam_app.exam_app.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/quizzes")
public class QuizController {

    @Autowired
    QuizService quizService;

    @PostMapping("/createQuiz")
    public ResponseEntity<String> createQuiz(@RequestBody Quiz quiz){
        return quizService.createQuiz(quiz);
    }

    @GetMapping("/{quizId}")
    public ResponseEntity<Quiz> showQuizById(@PathVariable Integer quizId){
        return quizService.showQuizById(quizId);
    }
}
