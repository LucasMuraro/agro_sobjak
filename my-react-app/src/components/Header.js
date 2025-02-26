// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const [visibleSubMenu, setVisibleSubMenu] = useState(null);

  const handleMouseEnter = (item) => {
    setVisibleSubMenu(item);
  };

  const handleMouseLeave = () => {
    setVisibleSubMenu(null);
  };

  return (
    <header className="app-header">
      <nav>
        <ul className="menu">
          <li>
            <Link to="/">React App</Link>
          </li>
          <li onMouseEnter={() => handleMouseEnter('users')} onMouseLeave={handleMouseLeave}>
            <span>Usuários</span>
            <ul className={`submenu ${visibleSubMenu === 'users' ? 'show' : ''}`}>
              <li><Link to="/main/userform">Cadastrar Novo Usuário</Link></li>
              <li><Link to="/main/users">Consultar Todos</Link></li>
            </ul>
          </li>
          <li onMouseEnter={() => handleMouseEnter('gateway')} onMouseLeave={handleMouseLeave}>
            <span>Gateway</span>
            <ul className={`submenu ${visibleSubMenu === 'gateway' ? 'show' : ''}`}>
              <li><Link to="/main/gatewayform">Cadastrar Novo Gateway</Link></li>
              <li><Link to="/main/gateways">Consultar Todos</Link></li>
            </ul>
          </li>
          <li onMouseEnter={() => handleMouseEnter('atuador')} onMouseLeave={handleMouseLeave}>
            <span>Atuador</span>
            <ul className={`submenu ${visibleSubMenu === 'atuador' ? 'show' : ''}`}>
              <li><Link to="/main/atuadorform">Cadastrar Novo Atuador</Link></li>
              <li><Link to="/main/atuadores">Consultar Todos</Link></li>
            </ul>
          </li>
          <li onMouseEnter={() => handleMouseEnter('dispositivo')} onMouseLeave={handleMouseLeave}>
            <span>Dispositivo</span>
            <ul className={`submenu ${visibleSubMenu === 'dispositivo' ? 'show' : ''}`}>
              <li><Link to="/main/dispositivoform">Cadastrar Novo Dispositivo</Link></li>
              <li><Link to="/main/dispositivos">Consultar Todos</Link></li>
            </ul>
          </li>
          <li onMouseEnter={() => handleMouseEnter('reading')} onMouseLeave={handleMouseLeave}>
            <span>Leitura</span>
            <ul className={`submenu ${visibleSubMenu === 'reading' ? 'show' : ''}`}>
              <li><Link to="/main/leituraform">Cadastrar Nova Leitura</Link></li>
              <li><Link to="/main/leituras">Consultar Todas</Link></li>
            </ul>
          </li>
          <li onMouseEnter={() => handleMouseEnter('sensor')} onMouseLeave={handleMouseLeave}>
            <span>Sensor</span>
            <ul className={`submenu ${visibleSubMenu === 'sensor' ? 'show' : ''}`}>
              <li><Link to="/main/sensorform">Cadastrar Novo Sensor</Link></li>
              <li><Link to="/main/sensors">Consultar Todos</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;