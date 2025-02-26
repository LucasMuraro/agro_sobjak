// src/components/AtuadorForm.js
import React, { useState } from 'react';
import './UserForm.css';

function AtuadorForm() {
  const [atuador, setAtuador] = useState({
    idDevice: '',
    nome: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Sending POST to /api1/atuador with:", JSON.stringify(atuador));
    fetch('/api1/atuador', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(atuador),
    })
      .then(response => {
        console.log("Response:", response.status, response.statusText);
        return response.text().then(text => {
          console.log("Response body:", text);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          setSubmitted(true);
          setAtuador({ idDevice: '', nome: '' });
          return JSON.parse(text);
        });
      })
      .then(data => console.log('Atuador criado:', data))
      .catch(error => console.error('Erro ao criar atuador:', error));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAtuador(prevAtuador => ({ ...prevAtuador, [name]: value }));
  };

  return (
    <div className="user-form-container">
      <h2>Cadastrar Novo Atuador</h2>
      {submitted && <p>Atuador cadastrado com sucesso!</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="idDevice"
          value={atuador.idDevice}
          onChange={handleChange}
          placeholder="ID do Dispositivo"
          required
        />
        <input
          type="text"
          name="nome"
          value={atuador.nome}
          onChange={handleChange}
          placeholder="Nome"
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default AtuadorForm;