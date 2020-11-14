package com.tests.entity.comU;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity
@Table(name = "comUResult")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
public class ComUResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;
    @Column(name = "client")
    Integer client;
    @Column(name = "question")
    Integer question;
    @Column(name = "expression")
    Double expression;
    @Column(name = "nonverbal")
    Double nonverbal;
    @Column(name = "ecoute")
    Double ecoute;
    @Column(name = "redactionnelle")
    Double redactionnelle;
    @Column(name = "observation")
    Double observation;
    @Column(name = "persuasion")
    Double  persuasion;
    @Column(name = "sympathie")
    Double sympathie;
    @Column(name = "autorite")
    Double autorite;
    @Column(name = "encensement")
    Double encensement;
    @Column(name = " rationalite")
    Double rationalite;
    @Column(name = "pression")
    Double pression;
    @Column(name = "reserve")
    Double reserve;
}
