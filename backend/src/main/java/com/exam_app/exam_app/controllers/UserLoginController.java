package com.exam_app.exam_app.controllers;

import com.exam_app.exam_app.entities.User;
import com.exam_app.exam_app.services.InvitationService;
import com.exam_app.exam_app.services.UserLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/quizzes")
public class UserLoginController {

    @Autowired
    UserLoginService userLoginService;

    @PostMapping("/user-login")
    public ResponseEntity<?> validateUserEmail(@RequestParam String token, @RequestBody User user) {
        return userLoginService.validateUserEmail(token, user);
    }
}
