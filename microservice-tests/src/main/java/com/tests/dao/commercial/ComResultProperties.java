package com.tests.dao.commercial;

import com.tests.entity.commercial.CommercialResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ComResultProperties extends JpaRepository<CommercialResult,Integer> {
    Optional<CommercialResult>findByClient(int id);
}
