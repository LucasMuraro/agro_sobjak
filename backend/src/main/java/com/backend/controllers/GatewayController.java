package com.backend.controllers;

import java.util.List;

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
import org.springframework.web.bind.annotation.CrossOrigin;

import com.backend.dto.GatewayDTO;
import com.backend.exceptions.NotFoundException;
import com.backend.model.Gateway;
import com.backend.service.GatewayService;

@RestController
@RequestMapping("/gateways")
@CrossOrigin(origins = "http://localhost:3000")
public class GatewayController {

    @Autowired
    private GatewayService gatewayService;

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody GatewayDTO dto) {
        try {
            var res = gatewayService.create(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(res);
        } catch(NotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch(Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping
    public List<Gateway> getAll() {
        return gatewayService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getById(@PathVariable long id) {
        var gateway = gatewayService.getById(id);
        
        return gateway.isPresent()
            ? ResponseEntity.ok().body(gateway.get())
            : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable long id, @RequestBody GatewayDTO dto) {
        try {
            return ResponseEntity.ok().body(gatewayService.update(id, dto));
        } catch(NotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch(Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable long id) {
        try {
            gatewayService.delete(id);
            return ResponseEntity.ok().build();
        } catch(NotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch(Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }
}
