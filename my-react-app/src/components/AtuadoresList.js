// src/components/AtuadoresList.js
import React, { useEffect, useState } from 'react';
import './UsersList.css';

function AtuadoresList() {
  const [atuadores, setAtuadores] = useState([]);

  useEffect(() => {
    fetch('/api1/atuador')
      .then(response => response.json())
      .then(data => setAtuadores(data))
      .catch(error => console.error('Erro ao buscar atuadores:', error));
  }, []);

  return (
    <div className="users-list-container">
      <h2>Lista de Atuadores</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>ID Dispositivo</th>
          </tr>
        </thead>
        <tbody>
          {atuadores.map(atuador => (
            <tr key={atuador.id}>
              <td>{atuador.id}</td>
              <td className="user-name">{atuador.nome}</td>
              <td>{atuador.device ? atuador.device.id : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AtuadoresList;