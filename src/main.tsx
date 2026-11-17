import '@fontsource-variable/geist';
import './styles/tokens.css';
import './styles/base.css';
import './i18n';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('#root bulunamadı.');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
