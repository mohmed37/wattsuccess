package com.tests.dao.ndream;

import com.tests.entity.ndream.AutoportraitResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AutoportraitResultRepositories extends JpaRepository<AutoportraitResult,Integer> {
    Optional<AutoportraitResult>findByClient(int id);
}
