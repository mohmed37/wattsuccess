package com.tests.entity.emoU;

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
@Table(name = "emoU")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
public class EmoU {
    @Id
    @Column(name = "id")
    int id;

    @Column(name = "question")
    String question;

   @Column(name = "dimension")
    String dimension;

    @Column(name = "inverse")
    Boolean inverse;


}
