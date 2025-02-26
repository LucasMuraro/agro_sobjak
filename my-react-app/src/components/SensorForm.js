import React, { useState } from 'react';
import './UserForm.css';

function SensorForm() {
  console.log("SensorForm component rendered"); // Debug
  const [sensor, setSensor] = useState({
    idDevice: '',
    nome: '',
    tipo: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Sending POST to /api1/sensor with:", JSON.stringify(sensor));
    fetch('/api1/sensor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sensor),
    })
      .then(response => {
        console.log("Response:", response.status, response.statusText);
        return response.text().then(text => {
          console.log("Response body:", text);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          setSubmitted(true);
          setSensor({ idDevice: '', nome: '', tipo: '' });
          return JSON.parse(text);
        });
      })
      .then(data => console.log('Sensor criado:', data))
      .catch(error => console.error('Erro ao criar sensor:', error));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSensor(prevSensor => ({ ...prevSensor, [name]: value }));
  };

  return (
    <div className="user-form-container">
      <h2>Cadastrar Novo Sensor</h2>
      {submitted && <p>Sensor cadastrado com sucesso!</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="idDevice"
          value={sensor.idDevice}
          onChange={handleChange}
          placeholder="ID do Dispositivo"
          required
        />
        <input
          type="text"
          name="nome"
          value={sensor.nome}
          onChange={handleChange}
          placeholder="Nome"
          required
        />
        <input
          type="text"
          name="tipo"
          value={sensor.tipo}
          onChange={handleChange}
          placeholder="Tipo"
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default SensorForm;