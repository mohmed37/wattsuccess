package com.tests.entity.emoU;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "EmoUResult")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
public class EmoUResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;
    @Column(name = "client")
    Integer client;
    @Column(name = "question")
    Integer question;
    @Column(name = "adaptabilite")
    Double adaptabilite;
    @Column(name = "connaissance")
    Double connaissance;
    @Column(name = "automotivation")
    Double automotivation;
    @Column(name = "maitrise")
    Double maitrise;
    @Column(name = "assertivite")
    Double assertivite;
    @Column(name = "confiance")
    Double  confiance;
    @Column(name = "relationnelle")
    Double relationnelle;
    @Column(name = "estime")
    Double estime;
    @Column(name = "optimisme")
    Double optimisme;
    @Column(name = " resilience")
    Double resilience;
    @Column(name = "influence")
    Double influence;
    @Column(name = "empathie")
    Double empathie;

}
