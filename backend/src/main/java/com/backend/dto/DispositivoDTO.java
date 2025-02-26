package com.backend.dto;

public record DispositivoDTO(
    Long idGateway,
    String nome,
    String descricao,
    String localizacao,
    String enderecoIP
) {}