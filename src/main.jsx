import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from "./Routes/Routes";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { MaintenanceProvider } from './contexts/MaintenanceContext';
import { NotificationProvider } from './contexts/NotificationContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <MaintenanceProvider>
        <NotificationProvider>
          <RouterProvider router={router} />
        </NotificationProvider>
      </MaintenanceProvider>
    </AuthProvider>
  </StrictMode>
)