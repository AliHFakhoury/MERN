import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './context/appContext';


//for browser compatibility
import 'core-js/modules/es.array.includes';
import 'core-js/modules/es.array.fill';
import 'core-js/modules/es.string.includes';
import 'core-js/modules/es.string.trim';
import 'core-js/modules/es.object.values';


// import all css files in assets/css
import '../src/assets/css/imports.js'

// import OD-Design System, Default V1 Styles Feb 2023, React V1 Styles Jan 2023
import './frontend/imports.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);