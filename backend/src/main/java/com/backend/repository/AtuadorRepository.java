package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.model.Atuador;

public interface AtuadorRepository extends JpaRepository<Atuador, Long> {
    // métodos personalizados...
}
