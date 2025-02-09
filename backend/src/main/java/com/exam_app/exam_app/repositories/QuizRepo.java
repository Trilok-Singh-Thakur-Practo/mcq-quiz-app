package com.exam_app.exam_app.repositories;

import com.exam_app.exam_app.entities.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepo extends JpaRepository<Quiz, Integer>{
}
