// src/App.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/main'); // Redirecione para /main
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Bem vindo ao React</h1>
        <p className="app-description">React application!</p>
      </header>
      <main className="app-main">
        <button className="app-button" onClick={handleGetStartedClick}>
          Vamos iniciar!
        </button>
      </main>
      <footer className="app-footer">
        <p className="app-footer-text">© 2024 React Application. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;