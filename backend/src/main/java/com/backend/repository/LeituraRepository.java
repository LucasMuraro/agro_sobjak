package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.model.Leitura;

public interface LeituraRepository extends JpaRepository<Leitura, Long> {
    // métodos personalizados...
}
