package com.tests.dao.bnbecome;

import com.tests.entity.bnbecome.HandiWatt;
import com.tests.entity.bnbecome.ListCompetencesClient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HandiWattRepositories extends JpaRepository<HandiWatt,Integer> {
    HandiWatt findByIdclient(int id);
}
