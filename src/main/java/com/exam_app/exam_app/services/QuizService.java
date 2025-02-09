package com.exam_app.exam_app.services;

import com.exam_app.exam_app.entities.Quiz;
import com.exam_app.exam_app.repositories.QuizRepo;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuizService {

    @Autowired
    QuizRepo quizRepo;

    public ResponseEntity<String> createQuiz(Quiz quiz) {
        try {
            quizRepo.save(quiz);
            return new ResponseEntity<>("SUCCESS", HttpStatus.CREATED );
        }
        catch (Exception exception){
            exception.printStackTrace();
        }
        return new ResponseEntity<>("FAILURE", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<Quiz> showQuizById(Integer quizId) {
        Optional<Quiz> quiz = quizRepo.findById(quizId);
        if(quiz.isPresent()){
                return new ResponseEntity<>(quiz.get(), HttpStatus.OK);
        }
        else {
            throw new EntityNotFoundException("Quiz not found with id: " + quizId);
        }
    }
}
