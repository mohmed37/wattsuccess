package com.tests.dao.bnbecome;

import com.tests.entity.bnbecome.ListCompetences;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ListCompetencesRepositories extends JpaRepository<ListCompetences,Integer> {
    Optional<ListCompetences>findByCompetence(String competence);
}
