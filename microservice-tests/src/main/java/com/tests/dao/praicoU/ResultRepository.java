package com.tests.dao.praicoU;

import com.tests.entity.praicoU.ResultPraicoU;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResultRepository extends JpaRepository<ResultPraicoU,Integer> {

    Optional<ResultPraicoU>findByClient(int id);

}
