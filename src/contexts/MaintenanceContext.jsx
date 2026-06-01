import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { getMaintenanceStatus } from '../api/maintenanceApi';
import { useAuth } from './AuthContext';

const MaintenanceContext = createContext();

export const useMaintenance = () => {
    const context = useContext(MaintenanceContext);
    if (!context) {
        throw new Error('useMaintenance must be used within a MaintenanceProvider');
    }
    return context;
};

export const MaintenanceProvider = ({ children }) => {
    const [maintenance, setMaintenance] = useState({
        status: false,
        reason: '',
        created_at: null
    });
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    // Once admin dismisses the modal, don't re-show until maintenance is toggled off and on again
    const adminAcknowledged = useRef(false);

    const { logout, isAuthenticated, isAdmin } = useAuth();

    const checkMaintenanceStatus = async () => {
        try {
            const response = await getMaintenanceStatus();
            if (response.data.success) {
                const data = response.data.data;
                setMaintenance(data);

                if (data.status) {
                    // Show modal: for regular users always; for admin only if not yet acknowledged
                    if (!isAdmin || !adminAcknowledged.current) {
                        setShowModal(true);
                    }

                    // Only log out non-admin authenticated users
                    if (isAuthenticated && !isAdmin) {
                        setTimeout(() => logout(), 3000);
                    }
                } else {
                    setShowModal(false);
                    adminAcknowledged.current = false; // reset for next maintenance window
                }
            }
        } catch (error) {
            // Silently ignore — maintenance endpoint is AllowAny but may fail in edge cases
            console.error('Maintenance status check failed:', error);
        } finally {
            setLoading(false);
        }
    };

    // Admin calls this to dismiss the modal — it won't re-appear until maintenance is reset
    const adminDismissModal = () => {
        adminAcknowledged.current = true;
        setShowModal(false);
    };

    useEffect(() => {
        checkMaintenanceStatus();
        const interval = setInterval(checkMaintenanceStatus, 30000);
        return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isAdmin]);

    const value = {
        maintenance,
        loading,
        showModal,
        setShowModal,
        adminDismissModal,
        checkMaintenanceStatus,
        refreshMaintenanceStatus: checkMaintenanceStatus,
    };

    return (
        <MaintenanceContext.Provider value={value}>
            {children}
        </MaintenanceContext.Provider>
    );
};
