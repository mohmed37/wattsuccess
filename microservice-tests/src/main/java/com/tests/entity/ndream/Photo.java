package com.tests.entity.ndream;

import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity
@Table(name = "image_table")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Photo {

    public Photo(String name, String type, byte[] picByte) {
        this.name = name;
        this.type = type;
        this.picByte = picByte;
    }


    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "type")
    private String type;
    @Column(name = "alt")
    private String alt;


    // les octets d'image peuvent avoir de grandes longueurs, nous spécifions donc une valeur
    // qui est supérieure à la longueur par défaut pour la colonne
    @Column(name = "picByte", length = 1000)
    private byte[] picByte;

}
