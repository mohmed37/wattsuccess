package com.tests.entity.entrepreneur;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity
@Table(name = "entrepresult")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
public class EntreprResult {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(name = "client")
    Integer client;
    @Column(name = "question")
    Integer question;
    Double realisation;
    Double defi;
    Double autonomie;
    Double pouvoir;
    Double confiance;
    Double perseverance;
    Double tolerance;
    Double creativie;
    Double destin;
    Double action;











}
