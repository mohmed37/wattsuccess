package com.tests.dao.ndream;

import com.tests.entity.ndream.RoueVie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoueVieRepositories extends JpaRepository<RoueVie,Integer> {
    Optional<RoueVie>findByClient(int id);
}
