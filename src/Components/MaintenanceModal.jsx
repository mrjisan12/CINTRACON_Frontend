import React from 'react';
import { useMaintenance } from '../contexts/MaintenanceContext';
import { useAuth } from '../contexts/AuthContext';

const MaintenanceModal = () => {
    const { maintenance, showModal, adminDismissModal } = useMaintenance();
    const { isAdmin } = useAuth();

    if (!showModal || !maintenance.status) return null;

    return (
        <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${isAdmin ? 'cursor-pointer' : ''}`}
            onClick={isAdmin ? adminDismissModal : undefined}
        >
            {/* Stop propagation so clicking inside the card doesn't close for admins accidentally */}
            <div
                className="bg-gradient-to-br from-red-500/20 to-red-600/30 backdrop-blur-xl border border-red-400/30 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center border border-red-400/30">
                    <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white mb-4">
                    Maintenance Break
                </h2>

                {/* Reason */}
                <div className="bg-black/30 rounded-xl p-4 mb-6 border border-red-400/20">
                    <p className="text-red-200 text-lg leading-relaxed">
                        {maintenance.reason || "System is under maintenance. Please try again later."}
                    </p>
                </div>

                {/* Additional Info */}
                <div className="text-gray-300 text-sm space-y-2">
                    <p>🚧 We're performing scheduled maintenance</p>
                    <p>⏰ We'll be back online shortly</p>
                    {maintenance.created_at && (
                        <p className="text-gray-400 text-xs mt-4">
                            Started: {new Date(maintenance.created_at).toLocaleString()}
                        </p>
                    )}
                </div>

                {/* Footer — differs for admin vs regular user */}
                {isAdmin ? (
                    <div className="mt-6 p-3 bg-blue-500/20 rounded-lg border border-blue-400/30">
                        <p className="text-blue-200 text-sm font-medium">
                            🛡️ You are viewing this as an Admin
                        </p>
                        <p className="text-blue-300/70 text-xs mt-1">
                            Click anywhere outside this card to dismiss and continue using the platform.
                        </p>
                    </div>
                ) : (
                    <div className="mt-6 p-3 bg-yellow-500/20 rounded-lg border border-yellow-400/30">
                        <p className="text-yellow-200 text-sm">
                            🔐 You will be logged out automatically for security reasons.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MaintenanceModal;
