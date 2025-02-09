package com.exam_app.exam_app.repositories;

import com.exam_app.exam_app.entities.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InvitationRepo extends JpaRepository<Invitation, Integer> {
    Optional<Invitation> findByToken(String token);
}
