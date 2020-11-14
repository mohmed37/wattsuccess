package com.tests.dao.entrepreneur;

import com.tests.entity.entrepreneur.Entrepreneur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntrepProperties extends JpaRepository<Entrepreneur,Integer> {
}
