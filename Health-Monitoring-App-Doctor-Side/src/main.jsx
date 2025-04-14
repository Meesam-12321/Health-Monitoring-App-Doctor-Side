import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { DarkModeProvider } from './Context/DarkModeContext.jsx'; // Import the DarkModeProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkModeProvider> {/* Wrap the App with the DarkModeProvider */}
      <App />
    </DarkModeProvider>
  </StrictMode>
);
