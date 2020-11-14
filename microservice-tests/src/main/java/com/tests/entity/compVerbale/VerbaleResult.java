package com.tests.entity.compVerbale;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity
@Table(name = "verbaleResult")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
public class VerbaleResult {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(name = "client")
    Integer client;
    @Column(name = "question")
    Integer question;
    @Column(name = "exercice1")
    Boolean exercice1;
    @Column(name = "exercice2")
    Boolean exercice2;
    @Column(name = "resultat")
    Integer resultat;

}
