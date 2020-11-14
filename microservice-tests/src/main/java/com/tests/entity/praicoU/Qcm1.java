package com.tests.entity.praicoU;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "questionnaire1")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
public class Qcm1 implements Serializable {
    @Id
    @Column(name = "id")
    int id;
    @Column(name = "question")
    String question;

    @Column(name = "reponse1")
    String reponse1;

    @Column(name = "reponse2")
    String reponse2;

    @Column(name = "code1")
    String code1;

    @Column(name = "code2")
    String code2;




}
