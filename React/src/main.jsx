import './App.css'
import React from 'react';
import App from './App.jsx';
import ReactDOM from 'react-dom/client';
import { DogsProvider } from './DogProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DogsProvider>
      <App />
    </DogsProvider>
  </React.StrictMode>,
)
