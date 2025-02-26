// src/components/LeiturasList.js
import React, { useEffect, useState } from 'react';
import './UsersList.css';

function LeiturasList() {
  const [leituras, setLeituras] = useState([]);

  useEffect(() => {
    fetch('/api1/leitura')
      .then(response => response.json())
      .then(data => setLeituras(data))
      .catch(error => console.error('Erro ao buscar leituras:', error));
  }, []);

  return (
    <div className="users-list-container">
      <h2>Lista de Leituras</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Valor</th>
            <th>Data</th>
            <th>ID Sensor</th>
          </tr>
        </thead>
        <tbody>
          {leituras.map(leitura => (
            <tr key={leitura.id}>
              <td>{leitura.id}</td>
              <td className="user-name">{leitura.valor}</td>
              <td>{leitura.data}</td>
              <td>{leitura.sensor ? leitura.sensor.id : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeiturasList;