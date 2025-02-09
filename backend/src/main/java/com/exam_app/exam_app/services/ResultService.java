package com.exam_app.exam_app.services;

import com.exam_app.exam_app.entities.*;
import com.exam_app.exam_app.repositories.QuizRepo;
import com.exam_app.exam_app.repositories.ResponseRepo;
import com.exam_app.exam_app.repositories.ResultRepo;
import com.exam_app.exam_app.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResultService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    QuizRepo quizRepo;

    @Autowired
    ResultRepo resultRepo;

    @Autowired
    ResponseRepo responseRepo;


    public ResponseEntity<String> submitTest(Integer userId, Integer quizId) {
        Optional<User> optionalUser = userRepo.findById(userId);
        Optional<Quiz> optionalQuiz = quizRepo.findById(quizId);

        if(optionalQuiz.isEmpty() || optionalUser.isEmpty()){
            return new ResponseEntity<>("User or Quiz do not found", HttpStatus.NOT_FOUND);
        }

        User user = optionalUser.get();
        Quiz quiz = optionalQuiz.get();

        if(resultRepo.findByUserAndQuiz(user, quiz).isPresent()){
            return new ResponseEntity<>("Test already submitted", HttpStatus.BAD_REQUEST);
        }


        List<Question> questions = quiz.getQuestions(); // Get all questions in the quiz
        int score = 0;

        for (Question question : questions) {
            Optional<Response> responseOptional = responseRepo.findByUserAndQuestion(user, question);

            if (responseOptional.isPresent()) {
                Response response = responseOptional.get();
                // Compare the selected answer with the correct answer
                String correctOptionKey = getOptionKey(question, response.getUserOption());
                if (correctOptionKey != null && correctOptionKey.equals(question.getCorrectOption())) {
                    score += 1; // +1 for correct answer
                }
            }
            // If no response is found, score remains the same (0 for unattempted)
        }

        // Save result
        Result result = new Result();
        result.setUser(user);
        result.setQuiz(quiz);
        result.setScore(score);

        resultRepo.save(result);
        return new ResponseEntity<>("Test submitted successfully. Your score: " + score, HttpStatus.OK);
    }

    private String getOptionKey(Question question, String userOption) {
        if (question.getOption1().equals(userOption)) return "option1";
        if (question.getOption2().equals(userOption)) return "option2";
        if (question.getOption3().equals(userOption)) return "option3";
        if (question.getOption4().equals(userOption)) return "option4";
        return null; // If no match is found
    }

    public ResponseEntity<Integer> getScore(Integer userId, Integer quizId) {
        Optional<User> optionalUser = userRepo.findById(userId);
        Optional<Quiz> optionalQuiz = quizRepo.findById(quizId);

        if(optionalUser.isEmpty() || optionalQuiz.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Optional<Result> result = resultRepo.findByUserAndQuiz(optionalUser.get(), optionalQuiz.get());

        return result.map(value -> new ResponseEntity<>(value.getScore(), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(0, HttpStatus.OK)); // Return 0 if no result found
    }

}
