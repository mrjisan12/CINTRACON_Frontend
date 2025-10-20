import React, { createContext, useState, useContext, useEffect } from 'react';
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
    const { logout, isAuthenticated } = useAuth();

    // Check maintenance status
    const checkMaintenanceStatus = async () => {
        try {
            const response = await getMaintenanceStatus();
            if (response.data.success) {
                const maintenanceData = response.data.data;
                setMaintenance(maintenanceData);

                // Show modal if maintenance is active
                if (maintenanceData.status) {
                    setShowModal(true);
                    
                    // If maintenance is active and user is authenticated, logout user
                    if (isAuthenticated) {
                        setTimeout(() => {
                            logout();
                        }, 3000); // Logout after 3 seconds to show the message
                    }
                } else {
                    setShowModal(false);
                }
            }
        } catch (error) {
            console.error('Error checking maintenance status:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkMaintenanceStatus();

        // Check every 30 seconds
        const interval = setInterval(checkMaintenanceStatus, 30000);

        return () => clearInterval(interval);
    }, [isAuthenticated]);

    const value = {
        maintenance,
        loading,
        showModal,
        setShowModal,
        checkMaintenanceStatus,
        refreshMaintenanceStatus: checkMaintenanceStatus
    };

    return (
        <MaintenanceContext.Provider value={value}>
            {children}
        </MaintenanceContext.Provider>
    );
};