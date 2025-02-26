// src/main/java/com/backend/service/SensorService.java
package com.backend.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dto.SensorDTO;
import com.backend.exceptions.NotFoundException;
import com.backend.model.Dispositivo;
import com.backend.model.Sensor;
import com.backend.repository.DispositivoRepository;
import com.backend.repository.SensorRepository;

@Service
public class SensorService {

    private static final Logger logger = LoggerFactory.getLogger(SensorService.class);

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private DispositivoRepository dispositivoRepository;

    public Sensor create(SensorDTO dto) throws NotFoundException {
        logger.info("Creating sensor from DTO: {}", dto);
        Sensor sensor = new Sensor();
        BeanUtils.copyProperties(dto, sensor, "idDevice");

        Dispositivo dispositivo = dispositivoRepository.findById(dto.idDevice())
                .orElseThrow(() -> new NotFoundException("Dispositivo with ID " + dto.idDevice() + " not found"));
        sensor.setDispositivo(dispositivo);

        Sensor savedSensor = sensorRepository.save(sensor);
        logger.info("Sensor created: {}", savedSensor);
        return savedSensor;
    }

    public List<Sensor> getAll() {
        List<Sensor> sensors = sensorRepository.findAll();
        logger.info("Retrieved {} sensors", sensors.size());
        return sensors;
    }

    public Optional<Sensor> getById(Long id) {
        Optional<Sensor> sensor = sensorRepository.findById(id);
        if (sensor.isPresent()) {
            logger.info("Found sensor with ID {}: {}", id, sensor.get());
        } else {
            logger.warn("Sensor with ID {} not found", id);
        }
        return sensor;
    }

    public Sensor update(Long id, SensorDTO dto) throws NotFoundException {
        logger.info("Updating sensor with ID {} using DTO: {}", id, dto);
        Sensor sensor = sensorRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Sensor with ID " + id + " not found"));
        BeanUtils.copyProperties(dto, sensor, "id", "idDevice");

        Dispositivo dispositivo = dispositivoRepository.findById(dto.idDevice())
                .orElseThrow(() -> new NotFoundException("Dispositivo with ID " + dto.idDevice() + " not found"));
        sensor.setDispositivo(dispositivo);

        Sensor updatedSensor = sensorRepository.save(sensor);
        logger.info("Sensor updated: {}", updatedSensor);
        return updatedSensor;
    }

    public void delete(Long id) throws NotFoundException {
        logger.info("Deleting sensor with ID {}", id);
        if (!sensorRepository.existsById(id)) {
            throw new NotFoundException("Sensor with ID " + id + " not found");
        }
        sensorRepository.deleteById(id);
        logger.info("Sensor with ID {} deleted", id);
    }
}