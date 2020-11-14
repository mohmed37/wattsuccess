package com.tests.entity.compVerbale;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity
@Table(name = "compVerbalePartie1")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
public class CompVerbale1 {
    @Id
    @Column(name = "id")
    int id;

    @Column(name = "question")
    String question;

    @Column(name = "reponse1")
    String reponse1;

    @Column(name = "reponse2")
    String reponse2;

    @Column(name = "reponse3")
    String reponse3;

    @Column(name = "reponse4")
    String reponse4;

    @Column(name = "reponse5")
    String reponse5;

    @Column(name = "solution")
    String solution;
}
