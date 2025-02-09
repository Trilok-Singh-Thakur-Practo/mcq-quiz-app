package com.exam_app.exam_app.services;

import com.exam_app.exam_app.entities.Invitation;
import com.exam_app.exam_app.entities.Quiz;
import com.exam_app.exam_app.entities.Result;
import com.exam_app.exam_app.entities.User;
import com.exam_app.exam_app.repositories.InvitationRepo;
import com.exam_app.exam_app.repositories.QuizRepo;
import com.exam_app.exam_app.repositories.ResultRepo;
import com.exam_app.exam_app.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class InvitationService {

    @Autowired
    InvitationRepo invitationRepo;

    @Autowired
    QuizRepo quizRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    ResultRepo resultRepo;

    public ResponseEntity<String> createInvitation(Integer quizId, String email) {

        Optional<Quiz> quizOptional = quizRepo.findById(quizId);

        if(quizOptional.isEmpty()){
            return new ResponseEntity<>("QUIZ NOT FOUND", HttpStatus.NOT_FOUND);
        }

        Quiz quiz = quizOptional.get();
        LocalDateTime startTime = quiz.getStartTime();
        LocalDateTime endTime = quiz.getEndTime();

        Optional<User> userOptional = userRepo.findByEmail(email);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        User user = userOptional.get();

        //Check if the user has already submitted the test
        Optional<Result> existingResult = resultRepo.findByUserAndQuiz( user, quiz);
        if (existingResult.isPresent()) {
            return new ResponseEntity<>("You have already submitted this quiz!", HttpStatus.FORBIDDEN);
        }

        Invitation invitation = new Invitation();
        invitation.setQuiz(quiz);
        invitation.setEmail(email);
        invitation.setUser(user); // Set user reference
        invitation.setToken(UUID.randomUUID().toString());

        invitationRepo.save(invitation);

        String inviteLink =  "http://localhost:3000/quizzes/user-login?token=" + invitation.getToken() +
                "&startTime=" + startTime +
                "&endTime=" + endTime;

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
