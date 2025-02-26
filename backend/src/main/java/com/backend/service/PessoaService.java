package com.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dto.PessoaDTO;
import com.backend.exceptions.NotFoundException;
import com.backend.model.Pessoa;
import com.backend.repository.PessoaRepository;

@Service
public class PessoaService {

    @Autowired
    private PessoaRepository pessoaRepository;


    public Pessoa create(PessoaDTO dto) {
        var pessoa = new Pessoa();
        BeanUtils.copyProperties(dto, pessoa);

        return pessoaRepository.save(pessoa);
    }

    public List<Pessoa> getAll() {
        return pessoaRepository.findAll();
    }

    public Optional<Pessoa> getById(long id) {
        return pessoaRepository.findById(id);
    }

    public Pessoa update(long id, PessoaDTO dto) throws NotFoundException {
        var res = pessoaRepository.findById(id);

        if (res.isEmpty()) {
            throw new NotFoundException("Pessoa " + id + " não existe.");
        }

        var pessoa = res.get();
        pessoa.setNome(dto.nome());
        pessoa.setEmail(dto.email());

        return pessoaRepository.save(pessoa);
    }

    public void delete(long id) throws NotFoundException {
        var res = pessoaRepository.findById(id);

        if (res.isEmpty()) {
            throw new NotFoundException("Pessoa " + id + " não existe.");
        }

        pessoaRepository.delete(res.get());
    }
}
