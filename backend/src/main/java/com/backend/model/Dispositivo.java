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
@Table(name = "tb_dispositivo") // Define o noma da tabel
@Data
public class Dispositivo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String nome;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "enderecoIP", nullable = false, unique = true)
    private String enderecoIP;

    @Column(name = "localizacao")
    private String localizacao;

    @ManyToOne
    private Gateway gateway;

}
