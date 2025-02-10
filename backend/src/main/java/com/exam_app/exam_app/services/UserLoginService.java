package com.exam_app.exam_app.services;

import com.exam_app.exam_app.entities.Invitation;
import com.exam_app.exam_app.entities.User;
import com.exam_app.exam_app.repositories.InvitationRepo;
import com.exam_app.exam_app.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserLoginService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    InvitationRepo invitationRepo;

    public ResponseEntity<?> validateUserEmail(String token, User user) {
        Optional<Invitation> invitationOptional = invitationRepo.findByToken(token);

        if (invitationOptional.isEmpty()) {
            return new ResponseEntity<>("Invalid token", HttpStatus.UNAUTHORIZED);
        }
        String name = user.getName();
        String email = user.getEmail();

        if (name == null || name.trim().isEmpty() || email == null || email.trim().isEmpty()) {
            return new ResponseEntity<>("Name or Email missing", HttpStatus.NOT_FOUND);
        }


        Invitation invitation = invitationOptional.get();
        if (!invitation.getInvitedEmails().contains(email)) {
            return new ResponseEntity<>("You are not invited to this quiz", HttpStatus.FORBIDDEN);
        }

        //return new ResponseEntity<>("Access granted", HttpStatus.OK);

        try {
            Optional<User> existingUser = userRepo.findByEmail(user.getEmail());
            if(existingUser.isPresent()){
                return new ResponseEntity<>(existingUser.get().getUserId(), HttpStatus.CREATED);
            }
            User savedUser = userRepo.save(user);
            return new ResponseEntity<>(savedUser.getUserId(), HttpStatus.CREATED);
        }
        catch (Exception exception){
            exception.printStackTrace();
        }
        return new ResponseEntity<>("Not Registered", HttpStatus.BAD_REQUEST);
    }
}
