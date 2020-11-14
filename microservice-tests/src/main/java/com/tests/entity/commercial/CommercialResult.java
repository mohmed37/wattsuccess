package com.tests.entity.commercial;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity
@Table(name = "commercialResult")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
public class CommercialResult {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(name = "client")
    Integer client;
    @Column(name = "question")
    Integer question;
    Double approche;
    Double combativite;
    Double prospection;
    Double reseau;
    Double satisfaction;
    Double strategiques;
    Double argumentations;
    Double comprehension;
    Double affirmation;
    Double controle;
    Double jeu;

}
