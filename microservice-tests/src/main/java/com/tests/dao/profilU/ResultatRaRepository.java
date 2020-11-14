package com.tests.dao.profilU;

import com.tests.entity.profilU.ResultatRa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResultatRaRepository extends JpaRepository<ResultatRa,Integer> {

Optional<ResultatRa>findByIdclient(int id);

}
