package com.tests.entity.ndream;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity
@Table(name = "roueVie")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor

public class RoueVie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;
    @Column(name = "client")
    Integer client;
    @Column(name = "social1")
    Integer social1;
    @Column(name = "personnelle1")
    Integer personnelle1;
    @Column(name = "sante1")
    Integer sante1;
    @Column(name = "famille1")
    Integer famille1;
    @Column(name = "professionnel1")
    Integer professionnel1;
    @Column(name = "social2")
    Integer social2;
    @Column(name = "personnelle2")
    Integer personnelle2;
    @Column(name = "sante2")
    Integer sante2;
    @Column(name = "famille2")
    Integer famille2;
    @Column(name = "professionnel2")
    Integer professionnel2;
    @Column(name = "qcm1")
    String qcm1;
    @Column(name = "qcm2")
    String qcm2;
    @Column(name = "qcm3")
    String qcm3;

}
