package com.exam_app.exam_app.controllers;

import com.exam_app.exam_app.services.InvitationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/invitations")
public class InvitationController {

    @Autowired
    private InvitationService invitationService;

    @PostMapping("/generate")
    public ResponseEntity<String> sendInvitation(@RequestParam Integer quiz_id, @RequestParam String email){
        return invitationService.createInvitation(quiz_id,email);
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestParam String token) {
        return invitationService.getQuizByToken(token);
    }
}
