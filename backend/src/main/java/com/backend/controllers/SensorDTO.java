package com.backend.controllers;

public record SensorDTO(
    Long idDevice,
    String nome,
    String tipo
) {}
