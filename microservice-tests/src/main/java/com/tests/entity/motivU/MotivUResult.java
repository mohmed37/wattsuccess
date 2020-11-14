package com.tests.entity.motivU;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity
@Table(name = "motivUResult")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor

public class MotivUResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;
    @Column(name = "client")
    Integer client;
    @Column(name = "question")
    Integer question;
    @Column(name = "social")
    Double social;
    @Column(name = "rencontres")
    Double rencontres;
    @Column(name = "challenge")
    Double challenge;
    @Column(name = "honnetete")
    Double honnetete;
    @Column(name = "responsabilite")
    Double responsabilite;
    @Column(name = "statut")
    Double  statut;
    @Column(name = "utilite")
    Double utilite;
    @Column(name = "retribution")
    Double retribution;
    @Column(name = "personnel")
    Double personnel;
    @Column(name = " autonomie")
    Double autonomie;
    @Column(name = "mobilite")
    Double mobilite;
    @Column(name = "connaissances")
    Double connaissances;

}
