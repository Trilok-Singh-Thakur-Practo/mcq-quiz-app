package com.exam_app.exam_app.controllers;

import com.exam_app.exam_app.services.InvitationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/invitations")
public class InvitationController {

    @Autowired
    private InvitationService invitationService;

    // API to generate quiz invitation for selected users
    @PostMapping("/generate")
    public ResponseEntity<String> sendInvitation(@RequestParam Integer quizId, @RequestBody List<String> invitedEmails) {
        return invitationService.createInvitation(quizId, invitedEmails);
    }

    //API to validate user email before quiz access
    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestParam String token) {
        return invitationService.getQuizByToken(token);
    }
}
