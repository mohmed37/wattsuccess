package com.microserviceuser.dao;

import com.microserviceuser.entities.Questionnaires;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuestionnairesRepository extends JpaRepository<Questionnaires,Long> {

    Optional<Questionnaires>findByUser_Id(Long id);
}
