package com.backend.dto;

public record GatewayDTO(
    Long idPerson, // ID da Pessoa
    String nome,
    String descricao,
    String enderecoIP
) {}
