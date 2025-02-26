// src/Root.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import UsersList from './components/UsersList';
import UserForm from './components/UserForm';
import GatewayForm from './components/GatewayForm';
import GatewaysList from './components/GatewaysList';
import AtuadorForm from './components/AtuadorForm';
import AtuadoresList from './components/AtuadoresList';
import DispositivoForm from './components/DispositivoForm';
import DispositivosList from './components/DispositivosList';
import LeituraForm from './components/LeituraForm';
import LeiturasList from './components/LeiturasList';
import SensorForm from './components/SensorForm';
import SensorsList from './components/SensorsList';
import MainLayout from './components/MainLayout';

function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="main" element={<MainLayout />}>
          <Route path="userform" element={<UserForm />} />
          <Route path="users" element={<UsersList />} />
          <Route path="gatewayform" element={<GatewayForm />} />
          <Route path="gateways" element={<GatewaysList />} />
          <Route path="atuadorform" element={<AtuadorForm />} />
          <Route path="atuadores" element={<AtuadoresList />} />
          <Route path="dispositivoform" element={<DispositivoForm />} />
          <Route path="dispositivos" element={<DispositivosList />} />
          <Route path="leituraform" element={<LeituraForm />} />
          <Route path="leituras" element={<LeiturasList />} />
          <Route path="sensorform" element={<SensorForm />} />
          <Route path="sensors" element={<SensorsList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Root;