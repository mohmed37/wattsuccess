package com.tests.entity.ndream;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity
@Table(name = "autoportrait")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
public class Autoportrait {
    @Id
    @Column(name = "id")
    int id;
    @Column(name = "personnalite")
    String personnalite;
}
