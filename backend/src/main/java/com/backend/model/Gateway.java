package com.backend.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "tb_gateway")
@Data
public class Gateway {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String nome;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "enderecoIP", nullable = false, unique = true)
    private String enderecoIP;

    @OneToMany(mappedBy = "gateway")
    private List<Dispositivo> dispositivos;

    @ManyToOne
    private Pessoa pessoa;
}