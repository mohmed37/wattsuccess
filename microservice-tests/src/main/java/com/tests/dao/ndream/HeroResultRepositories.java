package com.tests.dao.ndream;

import com.tests.entity.ndream.HeroResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HeroResultRepositories extends JpaRepository<HeroResult,Integer> {

    Optional<HeroResult>findByClient(Integer id);
}
