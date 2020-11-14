package com.tests.entity.orthoGram;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity
@Table(name = "orthoGramResult")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
public class OrthoGramResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;
    @Column(name = "client")
    Integer client;
    @Column(name = "question")
    Integer question;
    @Column(name = "questionPassé")
    Integer questionPasse;
    @Column(name = "exerciceOrtho1")
    Boolean exerciceOrtho1;
    @Column(name = "scoreOrtho")
    Integer scoreOrtho;
    @Column(name = "exerciceGram1")
    Boolean exerciceGram1;
    @Column(name = "scoreGram1")
    Integer scoreGram1;

}
