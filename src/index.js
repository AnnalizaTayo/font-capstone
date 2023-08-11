import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';

const root = document.getElementById('root');

const index = () => {
  
  createRoot(root).render(    
    <App />  
  );
};

index();
reportWebVitals();
