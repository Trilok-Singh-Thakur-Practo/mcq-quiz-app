package com.exam_app.exam_app.services;

import com.exam_app.exam_app.entities.User;
import com.exam_app.exam_app.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {
    @Autowired
    private UserRepo userRepo;

    public ResponseEntity<String> login(User user) {
        try {
            // Check if a user with the same username and email already exists
            Optional<User> existingUser = userRepo.findByNameAndEmail(user.getName(), user.getEmail());

            if (existingUser.isPresent()) {
                return new ResponseEntity<>("User already exists. Login successful!", HttpStatus.OK);
            }

            // Save new user if not found
            userRepo.save(user);
            return new ResponseEntity<>("User registered successfully!", HttpStatus.CREATED);
        }
        catch (Exception exception) {
            exception.printStackTrace();
            return new ResponseEntity<>("An error occurred while processing login!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
