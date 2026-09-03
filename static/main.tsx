import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RevivalPage from '../app/revival-page';
import '../app/globals-static.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RevivalPage />
  </StrictMode>,
);
