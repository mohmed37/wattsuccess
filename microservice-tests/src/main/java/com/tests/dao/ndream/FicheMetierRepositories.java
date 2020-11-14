package com.tests.dao.ndream;

import com.tests.entity.ndream.FicheMetier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FicheMetierRepositories extends JpaRepository<FicheMetier,Integer> {
    List<FicheMetier>findByCode(String code);
    List<FicheMetier>findByPhoto_Name(String name);
    List<FicheMetier> findByPhotoId(int id);
    Optional<FicheMetier> findByMetier(String metier);

}
