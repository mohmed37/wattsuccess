package com.tests.dao.entrepreneur;

import com.tests.entity.emoU.EmoUResult;
import com.tests.entity.entrepreneur.EntreprResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EntreResultProperties extends JpaRepository<EntreprResult,Integer> {
    Optional<EntreprResult> findByClient(int id);
}
