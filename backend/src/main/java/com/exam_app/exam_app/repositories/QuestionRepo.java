package com.exam_app.exam_app.repositories;

import com.exam_app.exam_app.entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepo extends JpaRepository<Question, Integer> {

    List<Question> findByCategory(String Category);
    List<Question> findByDifficultyLevel(String difficultyLevel);
}
