import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from "./Routes/Routes";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { MaintenanceProvider } from './contexts/MaintenanceContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <MaintenanceProvider>
        <RouterProvider router={router} />
      </MaintenanceProvider>
    </AuthProvider>
  </StrictMode>
)