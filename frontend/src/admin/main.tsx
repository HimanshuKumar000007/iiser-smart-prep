import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AdminApp } from './AdminApp';
import '../index.css';

const container = document.getElementById('admin-root');
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <AdminApp />
    </StrictMode>
  );
}
