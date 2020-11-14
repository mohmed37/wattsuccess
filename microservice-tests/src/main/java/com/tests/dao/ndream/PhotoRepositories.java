package com.tests.dao.ndream;

import com.tests.entity.ndream.Photo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PhotoRepositories extends JpaRepository<Photo,Integer> {
Optional<Photo>findByName(String name);

    Page<Photo> findAll(Pageable pageable);
}
