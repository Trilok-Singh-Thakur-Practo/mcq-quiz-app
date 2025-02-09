package com.exam_app.exam_app.services;

import com.exam_app.exam_app.entities.Question;
import com.exam_app.exam_app.entities.Response;
import com.exam_app.exam_app.entities.User;
import com.exam_app.exam_app.repositories.QuestionRepo;
import com.exam_app.exam_app.repositories.ResponseRepo;
import com.exam_app.exam_app.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ResponseService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    QuestionRepo questionRepo;

    @Autowired
    ResponseRepo responseRepo;


    public ResponseEntity<String> saveOrUpdateResponse(Integer userId, Integer questionId, String userOption) {
        Optional<User> optionalUser = userRepo.findById(userId);
        Optional<Question> optionalQuestion = questionRepo.findById(questionId);

        if(optionalUser.isEmpty() || optionalQuestion.isEmpty()){
            return new ResponseEntity<>("User or Question not found", HttpStatus.NOT_FOUND);
        }

        User user = optionalUser.get();
        Question question = optionalQuestion.get();

        Optional<Response> existingResponse = responseRepo.findByUserAndQuestion(user, question);
        Response response = existingResponse.orElseGet(Response::new);

        response.setUser(user);
        response.setQuestion(question);
        response.setUserOption(userOption);

        responseRepo.save(response);
        return new ResponseEntity<>("Response saved successfully", HttpStatus.CREATED);
    }
}
