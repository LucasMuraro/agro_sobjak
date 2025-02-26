package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.model.Gateway;

public interface GatewayRepository extends JpaRepository<Gateway, Long> {
    public List<Gateway> findByPessoaId(long id);
}
