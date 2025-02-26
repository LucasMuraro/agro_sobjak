package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.model.Dispositivo;

public interface DispositivoRepository extends JpaRepository<Dispositivo, Long> {
    // métodos personalizados...
}
