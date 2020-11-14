package com.tests.entity.personnalite;

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
@Table(name = "personnalite")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
public class Personnalite {
    @Id
    @Column(name = "id")
    int id;

    @Column(name = "dimension")
    String dimension;

    @Column(name = "question")
    String question;

    @Column(name = "inverse")
    Boolean inverse;

}
