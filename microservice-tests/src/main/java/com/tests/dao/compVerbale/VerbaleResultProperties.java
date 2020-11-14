package com.tests.dao.compVerbale;

import com.tests.entity.compVerbale.VerbaleResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VerbaleResultProperties extends JpaRepository<VerbaleResult,Integer> {
 Optional<VerbaleResult>findByClient(int id);


}
