package com.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "tb_leitura")
@Data
public class Leitura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id; 

    @Column(nullable = false)
    private String valor;

    @Column(nullable = false)
    private String data;

    @ManyToOne
    private Sensor sensor;
}