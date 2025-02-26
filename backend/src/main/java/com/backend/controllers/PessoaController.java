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

import com.backend.dto.PessoaDTO;
import com.backend.exceptions.NotFoundException;
import com.backend.model.Pessoa;
import com.backend.service.PessoaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/pessoa")
public class PessoaController {

    private static final Logger logger = LoggerFactory.getLogger(PessoaController.class);

    @Autowired
    private PessoaService pessoaService;

    @Operation(summary = "Create a new person")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Person created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid request data")
    })
    @PostMapping
    public ResponseEntity<Object> create(@RequestBody PessoaDTO dto) {
        logger.info("Received POST /pessoa with DTO: {}", dto);
        try {
            Pessoa createdPessoa = pessoaService.create(dto);
            logger.info("Created Pessoa: {}", createdPessoa);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPessoa);
        } catch (Exception e) {
            logger.error("Error creating Pessoa: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @Operation(summary = "Retrieve all persons")
    @ApiResponse(responseCode = "200", description = "List of all persons retrieved successfully")
    @GetMapping
    public ResponseEntity<List<Pessoa>> getAll() {
        logger.info("Received GET /pessoa");
        List<Pessoa> pessoas = pessoaService.getAll();
        return ResponseEntity.ok(pessoas);
    }

    @Operation(summary = "Retrieve a person by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Person found"),
        @ApiResponse(responseCode = "404", description = "Person not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Object> getById(@PathVariable("id") Long id) {
        logger.info("Received GET /pessoa/{}", id);
        return pessoaService.getById(id)
                .map(pessoa -> {
                    logger.info("Found Pessoa: {}", pessoa);
                    return ResponseEntity.<Object>ok(pessoa); // Explicitly cast to Object
                })
                .orElseGet(() -> {
                    logger.warn("Pessoa with ID {} not found", id);
                    return ResponseEntity.notFound().build();
                });
    }

    @Operation(summary = "Update an existing person")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Person updated successfully"),
        @ApiResponse(responseCode = "404", description = "Person not found"),
        @ApiResponse(responseCode = "400", description = "Invalid request data")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable("id") Long id, @RequestBody PessoaDTO dto) {
        logger.info("Received PUT /pessoa/{} with DTO: {}", id, dto);
        try {
            Pessoa updatedPessoa = pessoaService.update(id, dto);
            logger.info("Updated Pessoa: {}", updatedPessoa);
            return ResponseEntity.ok(updatedPessoa);
        } catch (NotFoundException e) {
            logger.warn("Pessoa with ID {} not found for update: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            logger.error("Error updating Pessoa: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @Operation(summary = "Delete a person by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Person deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Person not found"),
        @ApiResponse(responseCode = "400", description = "Invalid request")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id) {
        logger.info("Received DELETE /pessoa/{}", id);
        try {
            pessoaService.delete(id);
            logger.info("Deleted Pessoa with ID {}", id);
            return ResponseEntity.ok().build();
        } catch (NotFoundException e) {
            logger.warn("Pessoa with ID {} not found for deletion: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            logger.error("Error deleting Pessoa: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @GetMapping("/test")
    public String test() {
    logger.info("Test endpoint hit");
    return "Backend is working";
}
}