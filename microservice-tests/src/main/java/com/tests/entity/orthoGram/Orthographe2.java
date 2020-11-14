package com.tests.entity.orthoGram;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Orthographe2")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
public class Orthographe2 {
    @Id
    @Column(name = "id")
    int id;
    @Column(name = "mot1")
    String mot1;
    @Column(name = "mot2")
    String mot2;
    @Column(name = "mot3")
    String mot3;
    @Column(name = "mot4")
    String mot4;
    @Column(name = "mot5")
    String mot5;
    @Column(name = "solution")
    String solution;
}
