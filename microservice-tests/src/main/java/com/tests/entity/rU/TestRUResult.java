package com.tests.entity.rU;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity
@Table(name = "testRUResult")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
public class TestRUResult {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(name = "client")
    Integer client;
    @Column(name = "question")
    Integer question;
    @Column(name = "reponse")
    String reponse;
    @Column(name = "point")
    Integer point;

}
