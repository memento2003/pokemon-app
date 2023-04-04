import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.scss';

const root = ReactDOM.createRoot(document.getElementById('root')); // рендер сайту
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);