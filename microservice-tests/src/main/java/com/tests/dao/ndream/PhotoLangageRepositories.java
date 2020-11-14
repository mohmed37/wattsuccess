package com.tests.dao.ndream;

import com.tests.entity.ndream.PhotoLangage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PhotoLangageRepositories extends JpaRepository<PhotoLangage,Integer> {

    Optional<PhotoLangage> findByClient(Integer id);
}
