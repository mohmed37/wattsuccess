package com.tests.dao.personnalite;

import com.tests.entity.personnalite.Personnalite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersoProperties extends JpaRepository<Personnalite,Integer> {
}
