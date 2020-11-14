package com.tests.entity.bnbecome;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
@Table(name = "listCompetencesClient")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
public class ListCompetencesClient {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(name = "idclient")
    Integer idclient;
    @Column(name = "competence")
    String competence;
    @Column(name = "listCompetence")
    ArrayList<Object> listCompetence;

}
