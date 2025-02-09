package com.exam_app.exam_app.controllers;

import com.exam_app.exam_app.services.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/results")
public class ResultController {

    @Autowired
    ResultService resultService;

    @PostMapping("/submit-test")
    public ResponseEntity<String> submitTest(@RequestParam Integer userId, @RequestParam Integer quizId){
        return resultService.submitTest(userId, quizId);
    }

    @GetMapping("/get-score")
    public ResponseEntity<Integer> getScore(@RequestParam Integer userId, @RequestParam Integer quizId) {
        return resultService.getScore(userId, quizId);
    }
}
