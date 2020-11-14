package com.tests.entity.bnbecome;

import com.tests.entity.ndream.FicheMetier;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "listMetier")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
public class ListMetierClient implements Serializable {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(name = "client")
    Integer client;
    @Column(name = "valide")
    Object[] valide;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    Set<FicheMetier> ficheMetiers;
    

}
