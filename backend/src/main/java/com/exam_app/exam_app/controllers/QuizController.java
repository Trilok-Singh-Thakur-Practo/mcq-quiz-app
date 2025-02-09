package com.exam_app.exam_app.controllers;

import com.exam_app.exam_app.entities.Quiz;
import com.exam_app.exam_app.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")  // Allow requests from React app
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

    @GetMapping("/allQuizzes")
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        return quizService.getAllQuizzes();
    }
}
