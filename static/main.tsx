import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RevivalPage from '../app/legacy/page';
import '../app/globals-static.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RevivalPage />
  </StrictMode>,
);
