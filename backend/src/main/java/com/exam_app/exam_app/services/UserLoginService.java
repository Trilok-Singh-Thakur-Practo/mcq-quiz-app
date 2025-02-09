package com.exam_app.exam_app.services;

import com.exam_app.exam_app.entities.User;
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

    public ResponseEntity<?> useLogin(User user) {
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
