package com.tests.entity.ndream;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "ficheMetier")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
public class FicheMetier implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public int id;
    @Column(name = "metier")
    public String metier;
    @Column(name = "texte")
    public String texte;
    @Column(name = "competence")
    public String competence;
    @Column(name = "qualite")
    public String qualite;
    @Column(name = "code")
    public String code;
    @Column(name = "valide")
    public Boolean valide;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "photo_id")
    public PhotoFicheMetier photo;
}
