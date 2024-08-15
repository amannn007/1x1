import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './Routes'; // Import the Routes component

ReactDOM.render(
  <React.StrictMode>
    <AppRoutes /> {/* Use AppRoutes to enable routing */}
  </React.StrictMode>,
  document.getElementById('root')
);
