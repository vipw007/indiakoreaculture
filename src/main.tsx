import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import './styles/index.css';
import './app/i18n'; // import i18n configuration

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
