package com.exam_app.exam_app.controllers;

import com.exam_app.exam_app.entities.Question;
import com.exam_app.exam_app.services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    QuestionService questionService;

    @GetMapping("/allQuestions")
    public ResponseEntity<List<Question>> getAllQuestions(){
        return questionService.getAllQuestions();
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Question>> getQuestionsBYCategory(@PathVariable String category){
        return questionService.getQuestionsBYCategory(category);
    }

    @PostMapping("/addNewQuestion")
    public ResponseEntity<String> addQuestion(Question question){
        return questionService.addQuestion(question);
    }
}
