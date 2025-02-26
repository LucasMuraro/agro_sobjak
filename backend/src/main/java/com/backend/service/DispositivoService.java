package com.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dto.DispositivoDTO;
import com.backend.exceptions.NotFoundException;
import com.backend.model.Dispositivo;
import com.backend.repository.DispositivoRepository;

@Service
public class DispositivoService {

    @Autowired
    private DispositivoRepository dispositivoRepository;

    public Dispositivo create(DispositivoDTO dto) {
        Dispositivo device = new Dispositivo();
        BeanUtils.copyProperties(dto, device);
        return dispositivoRepository.save(device);
    }

    public List<Dispositivo> getAll() {
        return dispositivoRepository.findAll();
    }

    public Optional<Dispositivo> getById(long id) {
        return dispositivoRepository.findById(id);
    }

    public Dispositivo update(long id, DispositivoDTO dto) throws NotFoundException {
        Optional<Dispositivo> optionalDevice = dispositivoRepository.findById(id);
        Dispositivo dispositivo = optionalDevice.orElseThrow(() -> new NotFoundException("Dispositivo não encontrado"));
        BeanUtils.copyProperties(dto, dispositivo, "id");
        return dispositivoRepository.save(dispositivo);
    }

    public void delete(long id) throws NotFoundException {
        if (!dispositivoRepository.existsById(id)) {
            throw new NotFoundException("Dispositivo não encontrado");
        }
        dispositivoRepository.deleteById(id);
    }
}