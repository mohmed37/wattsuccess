package com.tests.entity.profilU;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
@Table(name = "profilu")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
public class ProfilU implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;

    @NotNull
    @Column(name = "question")
    String question;

    @NotNull
    @Column(name = "ithem")
    String item;

    @NotNull
    @Column(name = "dimension")
    String dimention;

    @NotNull
    @Column(name = "code")
    String code;

}
