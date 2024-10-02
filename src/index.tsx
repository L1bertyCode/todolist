import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppWithReducers from './App/AppWithReducers';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppWithReducers />
  </React.StrictMode>
);
