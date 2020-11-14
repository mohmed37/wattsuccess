package com.tests.dao.ndream;

import com.tests.entity.ndream.PhotoFicheMetier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhotoFMRepositories extends JpaRepository<PhotoFicheMetier,Integer > {
}
