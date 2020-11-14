package com.microserviceuser.dao;


import com.microserviceuser.entities.ConfirmationEmailToken;
import com.microserviceuser.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
    public interface ConfirmationEmailRepository extends JpaRepository<ConfirmationEmailToken, String> {
        ConfirmationEmailToken findByConfirmationToken(String confirmationToken);
    Optional<ConfirmationEmailToken> findByUser_Id(Long id);
    }


