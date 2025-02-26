package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.model.Sensor;

public interface SensorRepository extends JpaRepository<Sensor, Long> {
    // métodos personalizados...
}
