package com.tests.entity.bnbecome;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity
@Table(name = "handiWatt")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
public class HandiWatt {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(name = "idclient")
    int idclient;
    @Column(name = "mister")
    Object[]  mister;
    @Column(name = "potentiel")
    Object[] potentiel;
}

