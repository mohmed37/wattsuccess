package com.tests.entity.personnalite;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity
@Table(name = "persoResultat")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
public class PersonnaliteResult {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(name = "client")
    Integer client;
    @Column(name = "question")
    Integer question;
    Integer equilibre;
    Integer extraversion;
    Integer experience;
    Integer altruisme;
    Integer Meticulosite;



}
