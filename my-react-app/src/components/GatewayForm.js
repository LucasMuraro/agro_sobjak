// src/components/GatewayForm.js
import React, { useState } from 'react';
import './UserForm.css'; // Reuse UserForm styling

function GatewayForm() {
  const [gateway, setGateway] = useState({
    idPerson: '',
    nome: '',
    descricao: '',
    enderecoIP: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Sending POST to /api1/gateways with:", JSON.stringify(gateway));
    fetch('/api1/gateways', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gateway),
    })
      .then(response => {
        console.log("Response:", response.status, response.statusText);
        return response.text().then(text => {
          console.log("Response body:", text);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          setSubmitted(true);
          setGateway({ idPerson: '', nome: '', descricao: '', enderecoIP: '' });
          return JSON.parse(text);
        });
      })
      .then(data => console.log('Gateway criado:', data))
      .catch(error => console.error('Erro ao criar gateway:', error));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGateway(prevGateway => ({ ...prevGateway, [name]: value }));
  };

  return (
    <div className="user-form-container">
      <h2>Cadastrar Novo Gateway</h2>
      {submitted && <p>Gateway cadastrado com sucesso!</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="idPerson"
          value={gateway.idPerson}
          onChange={handleChange}
          placeholder="ID da Pessoa"
          required
        />
        <input
          type="text"
          name="nome"
          value={gateway.nome}
          onChange={handleChange}
          placeholder="Nome"
          required
        />
        <input
          type="text"
          name="descricao"
          value={gateway.descricao}
          onChange={handleChange}
          placeholder="Descrição"
        />
        <input
          type="text"
          name="enderecoIP"
          value={gateway.enderecoIP}
          onChange={handleChange}
          placeholder="Endereço IP"
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default GatewayForm;