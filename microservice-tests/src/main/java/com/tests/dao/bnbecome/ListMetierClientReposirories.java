package com.tests.dao.bnbecome;

import com.tests.entity.bnbecome.ListMetierClient;
import com.tests.entity.ndream.FicheMetier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ListMetierClientReposirories extends JpaRepository<ListMetierClient,Integer> {

    Optional<ListMetierClient> findByClient(Integer idClient);

}
