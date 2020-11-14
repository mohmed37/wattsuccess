package com.tests.entity.ndream;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity
@Table(name = "photoLangage")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
public class PhotoLangage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;
    @Column(name = "client")
    Integer client;
    @Column(name = "photo1")
    Integer photo1;
    @Column(name = "photo2")
    Integer photo2;
    @Column(name = "photo3")
    Integer photo3;
    @Column(name = "mot1")
    String mot1;
    @Column(name = "mot2")
    String mot2;
    @Column(name = "mot3")
    String mot3;
    @Column(name = "photo4")
    Integer photo4;
    @Column(name = "photo5")
    Integer photo5;
    @Column(name = "photo6")
    Integer photo6;
    @Column(name = "mot4")
    String mot4;
    @Column(name = "mot5")
    String mot5;
    @Column(name = "mot6")
    String mot6;
    @Column(name = "expression")
    String expression;
}
