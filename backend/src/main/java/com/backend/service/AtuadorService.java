package com.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dto.AtuadorDTO;
import com.backend.exceptions.NotFoundException;
import com.backend.model.Atuador;
import com.backend.repository.AtuadorRepository;
import com.backend.repository.DispositivoRepository; // Importe o repositório do Dispositivo

@Service
public class AtuadorService {

    @Autowired
    private AtuadorRepository atuadorRepository;

    @Autowired
    private DispositivoRepository dispositivoRepository; // Injete o repositório do Dispositivo

    public Atuador create(AtuadorDTO dto) throws NotFoundException {
        Atuador atuador = new Atuador();
        BeanUtils.copyProperties(dto, atuador, "device");

        // Busque o Dispositivo pelo ID e defina-o no Atuador
        var dispositivo = dispositivoRepository.findById(dto.idDevice())
            .orElseThrow(() -> new NotFoundException("Dispositivo não encontrado"));
        atuador.setDevice(dispositivo);

        return atuadorRepository.save(atuador);
    }

    public List<Atuador> getAll() {
        return atuadorRepository.findAll();
    }

    public Optional<Atuador> getById(long id) {
        return atuadorRepository.findById(id);
    }

    public Atuador update(long id, AtuadorDTO dto) throws NotFoundException {
        Optional<Atuador> optionalAtuador = atuadorRepository.findById(id);
        Atuador atuador = optionalAtuador.orElseThrow(() -> new NotFoundException("Atuador não encontrado"));
        BeanUtils.copyProperties(dto, atuador, "id");
        return atuadorRepository.save(atuador);
    }

    public void delete(long id) throws NotFoundException {
        if (!atuadorRepository.existsById(id)) {
            throw new NotFoundException("Atuador não encontrado");
        }
        atuadorRepository.deleteById(id);
    }
}
