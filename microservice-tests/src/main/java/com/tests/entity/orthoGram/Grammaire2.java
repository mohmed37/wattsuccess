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
@Table(name = "grammaire2")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
public class Grammaire2 {
    @Id
    @Column(name = "id")
    int id;
    @Column(name = "phrase1")
    String phrase1;
    @Column(name = "phrase2")
    String phrase2;
    @Column(name = "phrase3")
    String phrase3;
    @Column(name = "phrase4")
    String phrase4;
    @Column(name = "solution")
    String solution;
}
