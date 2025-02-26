package com.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dto.GatewayDTO;
import com.backend.exceptions.NotFoundException;
import com.backend.model.Gateway;
import com.backend.model.Pessoa;
import com.backend.repository.GatewayRepository;
import com.backend.repository.PessoaRepository;

@Service
public class GatewayService {

    @Autowired
    private GatewayRepository gatewayRepository;

    @Autowired
    private PessoaRepository pessoaRepository;

    public Gateway create(GatewayDTO dto) throws NotFoundException {
        Gateway gateway = new Gateway();
        BeanUtils.copyProperties(dto, gateway, "idPerson");
        
        // Obtém a pessoa pelo ID e seta no gateway
        Pessoa pessoa = pessoaRepository.findById(dto.idPerson())
            .orElseThrow(() -> new NotFoundException("Pessoa não encontrada"));
        gateway.setPessoa(pessoa);
        
        return gatewayRepository.save(gateway);
    }

    public List<Gateway> getAll() {
        return gatewayRepository.findAll();
    }

    public Optional<Gateway> getById(long id) {
        return gatewayRepository.findById(id);
    }

    public Gateway update(long id, GatewayDTO dto) throws NotFoundException {
        Optional<Gateway> optionalGateway = gatewayRepository.findById(id);
        Gateway gateway = optionalGateway.orElseThrow(() -> new NotFoundException("Gateway não encontrado"));
        BeanUtils.copyProperties(dto, gateway, "id", "idPerson");
        
        Pessoa pessoa = pessoaRepository.findById(dto.idPerson())
            .orElseThrow(() -> new NotFoundException("Pessoa não encontrada"));
        gateway.setPessoa(pessoa);

        return gatewayRepository.save(gateway);
    }

    public void delete(long id) throws NotFoundException {
        if (!gatewayRepository.existsById(id)) {
            throw new NotFoundException("Gateway não encontrado");
        }
        gatewayRepository.deleteById(id);
    }
}
