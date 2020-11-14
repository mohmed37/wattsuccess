package com.tests.dao.profilU;

import com.tests.entity.profilU.RestitutionProfilU;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RestititutionRepository extends JpaRepository<RestitutionProfilU,Integer> {
    Optional<RestitutionProfilU>findByDimensionAndPosition(String dimension,Integer position);

}
