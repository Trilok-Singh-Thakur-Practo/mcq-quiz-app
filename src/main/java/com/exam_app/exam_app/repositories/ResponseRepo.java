package com.exam_app.exam_app.repositories;

import com.exam_app.exam_app.entities.Question;
import com.exam_app.exam_app.entities.Response;
import com.exam_app.exam_app.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResponseRepo extends JpaRepository<Response,Integer> {
    Optional<Response> findByUserAndQuestion(User user, Question question);
}
