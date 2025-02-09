package com.exam_app.exam_app.controllers;

import com.exam_app.exam_app.services.ResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/responses")
public class ResponseController {

    @Autowired
    ResponseService responseService;

    @PostMapping("/submit-answer")
    public ResponseEntity<String> submitAnswer(@RequestParam Integer userId, @RequestParam Integer questionId, @RequestParam String userOption) {
        return responseService.saveOrUpdateResponse(userId, questionId, userOption);
    }
}
