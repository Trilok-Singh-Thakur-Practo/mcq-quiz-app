package com.exam_app.exam_app.services;

import com.exam_app.exam_app.entities.User;
import com.exam_app.exam_app.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    @Autowired
    UserRepo userRepo;
    public ResponseEntity<String> login(User user) {
        try {
            userRepo.save(user);
            return new ResponseEntity<>("SUCCESS", HttpStatus.CREATED);
        }
        catch (Exception exception){
            exception.printStackTrace();
        }

        return new ResponseEntity<>("FAILURE",HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
