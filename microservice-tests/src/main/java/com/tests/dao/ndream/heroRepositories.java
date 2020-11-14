package com.tests.dao.ndream;

import com.tests.entity.ndream.Hero;
import org.springframework.data.jpa.repository.JpaRepository;

public interface heroRepositories extends JpaRepository<Hero,Integer> {
}
