package com.tests.dao.motivU;

import com.tests.entity.motivU.MotivUResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MotivUResultProperties extends JpaRepository<MotivUResult,Integer> {
    Optional<MotivUResult>findByClient(int id);
}
