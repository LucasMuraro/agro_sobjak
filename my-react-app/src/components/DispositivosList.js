// src/components/DispositivosList.js
import React, { useEffect, useState } from 'react';
import './UsersList.css';

function DispositivosList() {
  const [dispositivos, setDispositivos] = useState([]);

  useEffect(() => {
    fetch('/api1/dispositivo')
      .then(response => response.json())
      .then(data => setDispositivos(data))
      .catch(error => console.error('Erro ao buscar dispositivos:', error));
  }, []);

  return (
    <div className="users-list-container">
      <h2>Lista de Dispositivos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Localização</th>
            <th>Endereço IP</th>
            <th>ID Gateway</th>
          </tr>
        </thead>
        <tbody>
          {dispositivos.map(dispositivo => (
            <tr key={dispositivo.id}>
              <td>{dispositivo.id}</td>
              <td className="user-name">{dispositivo.nome}</td>
              <td>{dispositivo.descricao}</td>
              <td>{dispositivo.localizacao}</td>
              <td>{dispositivo.enderecoIP}</td>
              <td>{dispositivo.gateway ? dispositivo.gateway.id : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DispositivosList;