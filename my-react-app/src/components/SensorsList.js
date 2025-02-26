import React, { useEffect, useState } from 'react';
import './UsersList.css';

function SensorsList() {
  console.log("SensorsList component rendered"); // Debug
  const [sensors, setSensors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching sensors from /api1/sensor"); // Debug
    fetch('/api1/sensor')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch sensors: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Sensors data:", data);
        setSensors(data);
      })
      .catch(error => {
        console.error('Erro ao buscar sensores:', error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return (
      <div className="users-list-container">
        <h2>Lista de Sensores</h2>
        <p style={{ color: 'red' }}>Erro: {error}</p>
      </div>
    );
  }

  return (
    <div className="users-list-container">
      <h2>Lista de Sensores</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>ID Dispositivo</th>
          </tr>
        </thead>
        <tbody>
          {sensors.map(sensor => (
            <tr key={sensor.id}>
              <td>{sensor.id}</td>
              <td className="user-name">{sensor.nome}</td>
              <td>{sensor.tipo}</td>
              <td>{sensor.dispositivo ? sensor.dispositivo.id : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SensorsList;