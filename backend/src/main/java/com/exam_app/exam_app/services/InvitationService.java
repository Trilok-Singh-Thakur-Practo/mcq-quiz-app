package com.exam_app.exam_app.services;

import com.exam_app.exam_app.entities.Invitation;
import com.exam_app.exam_app.entities.Quiz;
import com.exam_app.exam_app.repositories.InvitationRepo;
import com.exam_app.exam_app.repositories.QuizRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class InvitationService {

    @Autowired
    InvitationRepo invitationRepo;

    @Autowired
    QuizRepo quizRepo;

    public ResponseEntity<String> createInvitation(Integer quizId, List<String> invitedEmails) {
        Optional<Quiz> quizOptional = quizRepo.findById(quizId);

        if (quizOptional.isEmpty()) {
            return new ResponseEntity<>("Quiz not found", HttpStatus.NOT_FOUND);
        }

        Quiz quiz = quizOptional.get();
        Invitation invitation = new Invitation();
        invitation.setQuiz(quiz);
        invitation.setInvitedEmails(invitedEmails);
        invitation.setToken(UUID.randomUUID().toString());

        invitationRepo.save(invitation);

        // Convert start and end time to URL-safe format
        String startTime = quiz.getStartTime().toString();
        String endTime = quiz.getEndTime().toString();

        // Construct the invitation link with token, start time, and end time
        String inviteLink = String.format(
                "http://localhost:3000/quizzes/user-login?token=%s&startTime=%s&endTime=%s",
                invitation.getToken(), startTime, endTime
        );

        return new ResponseEntity<>(inviteLink, HttpStatus.CREATED);
    }


    public ResponseEntity<?> getQuizByToken(String token) {
        Optional<Invitation> invitationOptional = invitationRepo.findByToken(token);

        if (invitationOptional.isEmpty()) {
            return new ResponseEntity<>("Invalid invitation token", HttpStatus.UNAUTHORIZED);
        }

        Invitation invitation = invitationOptional.get();
        Quiz quiz = invitation.getQuiz();

        if (quiz == null) {
            return new ResponseEntity<>("Quiz not found", HttpStatus.NOT_FOUND);
        }

        LocalDateTime startTime = quiz.getStartTime();
        LocalDateTime endTime = quiz.getEndTime();

        if (startTime == null || endTime == null) {
            return new ResponseEntity<>("Quiz timing is not set properly", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // Check if the quiz is within the allowed time
        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(startTime) || now.isAfter(endTime)) {
            return new ResponseEntity<>("Quiz is not available at this time", HttpStatus.FORBIDDEN);
        }

        // Return quiz details
        return new ResponseEntity<>(quiz, HttpStatus.OK);
    }
}
