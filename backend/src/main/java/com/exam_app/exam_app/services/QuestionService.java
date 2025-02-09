package com.exam_app.exam_app.services;

import com.exam_app.exam_app.entities.Question;
import com.exam_app.exam_app.repositories.QuestionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuestionService {

    @Autowired
    QuestionRepo questionRepo;

    public ResponseEntity<List<Question>> getQuestionsByCategory(String category) {
        try {
            return new ResponseEntity<>(questionRepo.findByCategory(category), HttpStatus.OK);
        }
        catch (Exception exception){
            exception.printStackTrace();
        }

        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<List<Question>> getAllQuestions() {
        try {
            return new ResponseEntity<>(questionRepo.findAll(), HttpStatus.OK);
        }
        catch (Exception exception){
            exception.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<String> addQuestion(Question question) {
        try {
            questionRepo.save(question);
            return new ResponseEntity<>("SUCCESS", HttpStatus.CREATED);
        }
        catch (Exception exception){
            exception.printStackTrace();
        }
        return new ResponseEntity<>("FAILURE", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<List<Question>> getQuestionsByDifficultyLevel(String difficultyLevel) {
        try {
            return new ResponseEntity<>(questionRepo.findByDifficultyLevel(difficultyLevel), HttpStatus.OK);
        }
        catch (Exception exception){
            exception.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }
}
