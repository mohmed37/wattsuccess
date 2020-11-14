package com.tests.entity.cgu;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity
@Table(name = "cgu")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
public class Cgu {
    @Id
    @Column(name = "id")
    int id;
    @Column(name = "date")
    String date;
    @Column(name = "texte")
    String texte;
}
