package com.tests.bean;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoleBean {

    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private static ERoleBean name;

    public RoleBean() {

    }

    public RoleBean(ERoleBean name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public static ERoleBean getName() {
        return name;
    }

    public void setName(ERoleBean name) {
        this.name = name;
    }

}
