// src/main/java/com/backend/controllers/SensorController.java
package com.backend.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.SensorDTO;
import com.backend.exceptions.NotFoundException;
import com.backend.model.Sensor;
import com.backend.service.SensorService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/sensor")
public class SensorController {

    private static final Logger logger = LoggerFactory.getLogger(SensorController.class);

    @Autowired
    private SensorService sensorService;

    @Operation(summary = "Create a new sensor")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Sensor created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid request data")
    })
    @PostMapping
    public ResponseEntity<Object> create(@RequestBody SensorDTO dto) {
        logger.info("Received POST /sensor with DTO: {}", dto);
        try {
            Sensor createdSensor = sensorService.create(dto);
            logger.info("Created Sensor: {}", createdSensor);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdSensor);
        } catch (Exception e) {
            logger.error("Error creating Sensor: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @Operation(summary = "Retrieve all sensors")
    @ApiResponse(responseCode = "200", description = "List of all sensors retrieved successfully")
    @GetMapping
    public ResponseEntity<List<Sensor>> getAll() {
        logger.info("Received GET /sensor");
        List<Sensor> sensors = sensorService.getAll();
        return ResponseEntity.ok(sensors);
    }

    @Operation(summary = "Retrieve a sensor by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Sensor found"),
        @ApiResponse(responseCode = "404", description = "Sensor not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Object> getById(@PathVariable("id") Long id) {
        logger.info("Received GET /sensor/{}", id);
        return sensorService.getById(id)
                .map(sensor -> {
                    logger.info("Found Sensor: {}", sensor);
                    return ResponseEntity.<Object>ok(sensor);
                })
                .orElseGet(() -> {
                    logger.warn("Sensor with ID {} not found", id);
                    return ResponseEntity.notFound().build();
                });
    }

    @Operation(summary = "Update an existing sensor")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Sensor updated successfully"),
        @ApiResponse(responseCode = "404", description = "Sensor not found"),
        @ApiResponse(responseCode = "400", description = "Invalid request data")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable("id") Long id, @RequestBody SensorDTO dto) {
        logger.info("Received PUT /sensor/{} with DTO: {}", id, dto);
        try {
            Sensor updatedSensor = sensorService.update(id, dto);
            logger.info("Updated Sensor: {}", updatedSensor);
            return ResponseEntity.ok(updatedSensor);
        } catch (NotFoundException e) {
            logger.warn("Sensor with ID {} not found for update: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            logger.error("Error updating Sensor: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @Operation(summary = "Delete a sensor by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Sensor deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Sensor not found"),
        @ApiResponse(responseCode = "400", description = "Invalid request")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id) {
        logger.info("Received DELETE /sensor/{}", id);
        try {
            sensorService.delete(id);
            logger.info("Deleted Sensor with ID {}", id);
            return ResponseEntity.ok().build();
        } catch (NotFoundException e) {
            logger.warn("Sensor with ID {} not found for deletion: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            logger.error("Error deleting Sensor: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}