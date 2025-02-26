// src/components/LeituraForm.js
import React, { useState } from 'react';
import './UserForm.css';

function LeituraForm() {
  const [leitura, setLeitura] = useState({
    idSensor: '',
    valor: '',
    data: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Sending POST to /api1/leitura with:", JSON.stringify(leitura));
    fetch('/api1/leitura', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leitura),
    })
      .then(response => {
        console.log("Response:", response.status, response.statusText);
        return response.text().then(text => {
          console.log("Response body:", text);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          setSubmitted(true);
          setLeitura({ idSensor: '', valor: '', data: '' });
          return JSON.parse(text);
        });
      })
      .then(data => console.log('Leitura criada:', data))
      .catch(error => console.error('Erro ao criar leitura:', error));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLeitura(prevLeitura => ({ ...prevLeitura, [name]: value }));
  };

  return (
    <div className="user-form-container">
      <h2>Cadastrar Nova Leitura</h2>
      {submitted && <p>Leitura cadastrada com sucesso!</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="idSensor"
          value={leitura.idSensor}
          onChange={handleChange}
          placeholder="ID do Sensor"
          required
        />
        <input
          type="text"
          name="valor"
          value={leitura.valor}
          onChange={handleChange}
          placeholder="Valor"
          required
        />
        <input
          type="text"
          name="data"
          value={leitura.data}
          onChange={handleChange}
          placeholder="Data (e.g., 2025-02-23)"
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default LeituraForm;