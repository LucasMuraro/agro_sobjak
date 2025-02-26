// src/components/UsersList.js
import React, { useEffect, useState } from 'react';
import './UsersList.css';

function UsersList() {
  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    fetch('/api1/pessoa') // Use NGINX API gateway route
      .then(response => response.json())
      .then(data => setPessoas(data))
      .catch(error => console.error('Erro ao buscar pessoas:', error));
  }, []);

  return (
    <div className="users-list-container">
      <h2>Lista de Usuários</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map(pessoa => (
            <tr key={pessoa.id}>
              <td className="user-name">{pessoa.nome}</td>
              <td className="user-email">{pessoa.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersList;