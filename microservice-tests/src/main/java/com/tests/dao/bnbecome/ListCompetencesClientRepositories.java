package com.tests.dao.bnbecome;

import com.tests.entity.bnbecome.ListCompetencesClient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ListCompetencesClientRepositories extends JpaRepository<ListCompetencesClient,Integer> {

    Optional<ListCompetencesClient> findByIdclient(Integer id);
}
