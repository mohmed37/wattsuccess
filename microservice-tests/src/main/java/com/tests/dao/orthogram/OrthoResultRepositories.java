package com.tests.dao.orthogram;

import com.tests.entity.orthoGram.OrthoGramResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrthoResultRepositories extends JpaRepository<OrthoGramResult,Integer> {

    Optional<OrthoGramResult>findByClient(Integer integer);
}
