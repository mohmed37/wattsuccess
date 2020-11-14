package com.tests.entity.praicoU;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "resultPraicoU")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
public class ResultPraicoU implements Serializable {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(name = "Client")
    Integer client;
    @Column(name = "nombreP")
    Integer nombreP;
    @Column(name = "nombreR")
    Integer nombreR;
    @Column(name = "nombreA")
    Integer nombreA;
    @Column(name = "nombreI")
    Integer nombreI;
    @Column(name = "nombreC")
    Integer nombreC;
    @Column(name = "nombreO")
    Integer nombreO;

}
