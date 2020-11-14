package com.tests.entity.compVerbale;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity
@Table(name = "compVerbalePartie3")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
public class CompVerbale3 {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(name = "numero")
    String numero;
    @Column(name = "texte")
    String texte;
    @Column(name = "reponse1")
    String reponse1;

    @Column(name = "reponse2")
    String reponse2;

    @Column(name = "reponse3")
    String reponse3;

    @Column(name = "reponse4")
    String reponse4;

    @Column(name = "solution")
    String solution;
}
