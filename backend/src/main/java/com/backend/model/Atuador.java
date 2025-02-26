package com.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity // Entidade gerenciada pelo JPA (pode ser persistida)
@Table(name = "tb_atuador") // Define o noma da tabel
@Data
public class Atuador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String nome;

    @ManyToOne
    private Dispositivo device;
}