// src/components/GatewaysList.js
import React, { useEffect, useState } from 'react';
import './UsersList.css'; // Reuse UsersList styling

function GatewaysList() {
  const [gateways, setGateways] = useState([]);

  useEffect(() => {
    fetch('/api1/gateways')
      .then(response => response.json())
      .then(data => setGateways(data))
      .catch(error => console.error('Erro ao buscar gateways:', error));
  }, []);

  return (
    <div className="users-list-container">
      <h2>Lista de Gateways</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Endereço IP</th>
            <th>ID Pessoa</th>
          </tr>
        </thead>
        <tbody>
          {gateways.map(gateway => (
            <tr key={gateway.id}>
              <td>{gateway.id}</td>
              <td className="user-name">{gateway.nome}</td>
              <td>{gateway.descricao}</td>
              <td>{gateway.enderecoIP}</td>
              <td>{gateway.pessoa ? gateway.pessoa.id : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GatewaysList;