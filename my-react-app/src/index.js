// src/index.js

import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Root from './Root';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
