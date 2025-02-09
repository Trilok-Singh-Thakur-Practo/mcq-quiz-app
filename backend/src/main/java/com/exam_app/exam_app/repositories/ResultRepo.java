package com.exam_app.exam_app.repositories;

import com.exam_app.exam_app.entities.Quiz;
import com.exam_app.exam_app.entities.Response;
import com.exam_app.exam_app.entities.Result;
import com.exam_app.exam_app.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResultRepo extends JpaRepository<Result, Integer> {
    Optional<Result> findByUserAndQuiz(User user, Quiz quiz);
}
