package com.backend.dto;

public record LeituraDTO(
    Long idSensor, 
    String valor,
    String data
) {}