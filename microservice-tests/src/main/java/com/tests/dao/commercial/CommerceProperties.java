package com.tests.dao.commercial;

import com.tests.entity.commercial.Commercial;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommerceProperties extends JpaRepository<Commercial,Integer> {
}
