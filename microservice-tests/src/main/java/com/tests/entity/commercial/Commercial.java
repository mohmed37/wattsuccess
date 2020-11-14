package com.tests.entity.commercial;

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
@Table(name = "commercial")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
public class Commercial {

    @Id
    @Column(name = "id")
    int id;

    @Column(name = "pole")
    String pole;

    @Column(name = "dimension")
    String dimension;

    @Column(name = "question")
    String question;

    @Column(name = "a")
    String a;

    @Column(name = "b")
    String b;

    @Column(name = "c")
    String c;

    @Column(name = "inverse")
    Boolean inverse;

}
