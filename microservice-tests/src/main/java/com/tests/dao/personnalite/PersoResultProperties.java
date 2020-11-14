package com.tests.dao.personnalite;

import com.tests.entity.personnalite.PersonnaliteResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersoResultProperties extends JpaRepository<PersonnaliteResult,Integer> {
    Optional<PersonnaliteResult>findByClient(Integer integer);
}
