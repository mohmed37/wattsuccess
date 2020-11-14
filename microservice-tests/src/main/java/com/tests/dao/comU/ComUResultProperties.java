package com.tests.dao.comU;

import com.tests.entity.comU.ComUResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ComUResultProperties extends JpaRepository<ComUResult,Integer> {
    Optional<ComUResult>findByClient(int id);
}
