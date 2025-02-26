// src/components/DispositivoForm.js
import React, { useState } from 'react';
import './UserForm.css';

function DispositivoForm() {
  const [dispositivo, setDispositivo] = useState({
    idGateway: '',
    nome: '',
    descricao: '',
    localizacao: '',
    enderecoIP: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Sending POST to /api1/dispositivo with:", JSON.stringify(dispositivo));
    fetch('/api1/dispositivo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dispositivo),
    })
      .then(response => {
        console.log("Response:", response.status, response.statusText);
        return response.text().then(text => {
          console.log("Response body:", text);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          setSubmitted(true);
          setDispositivo({ idGateway: '', nome: '', descricao: '', localizacao: '', enderecoIP: '' });
          return JSON.parse(text);
        });
      })
      .then(data => console.log('Dispositivo criado:', data))
      .catch(error => console.error('Erro ao criar dispositivo:', error));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDispositivo(prevDispositivo => ({ ...prevDispositivo, [name]: value }));
  };

  return (
    <div className="user-form-container">
      <h2>Cadastrar Novo Dispositivo</h2>
      {submitted && <p>Dispositivo cadastrado com sucesso!</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="idGateway"
          value={dispositivo.idGateway}
          onChange={handleChange}
          placeholder="ID do Gateway"
          required
        />
        <input
          type="text"
          name="nome"
          value={dispositivo.nome}
          onChange={handleChange}
          placeholder="Nome"
          required
        />
        <input
          type="text"
          name="descricao"
          value={dispositivo.descricao}
          onChange={handleChange}
          placeholder="Descrição"
        />
        <input
          type="text"
          name="localizacao"
          value={dispositivo.localizacao}
          onChange={handleChange}
          placeholder="Localização"
        />
        <input
          type="text"
          name="enderecoIP"
          value={dispositivo.enderecoIP}
          onChange={handleChange}
          placeholder="Endereço IP"
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default DispositivoForm;