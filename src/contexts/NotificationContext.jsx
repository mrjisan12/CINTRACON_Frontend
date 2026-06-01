import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { toast } from 'react-toastify';
import { getNotifications, markNotificationsRead, deleteNotification } from '../api/notificationApi';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const useNotifications = () => {
    const ctx = useContext(NotificationContext);
    if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
    return ctx;
};

const WS_BASE = import.meta.env.VITE_WS_BASE_URL || 'ws://127.0.0.1:8000/ws';

export const NotificationProvider = ({ children }) => {
    const { isAuthenticated, token } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const wsRef = useRef(null);
    const reconnectAttempt = useRef(0);
    const reconnectTimer = useRef(null);

    const fetchNotifications = useCallback(async () => {
        if (!isAuthenticated) return;
        try {
            setLoading(true);
            const res = await getNotifications(1, 20);
            if (res.data.success) {
                setNotifications(res.data.data || []);
                setUnreadCount(res.data.pagination?.unread_count || 0);
            }
        } catch {
            // Silently fail — bell icon just shows 0
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated]);

    // Mark specific or all notifications as read
    const markRead = useCallback(async (ids = null) => {
        try {
            const body = ids ? { notification_ids: ids } : { all: true };
            await markNotificationsRead(body);
            if (ids) {
                setNotifications(prev =>
                    prev.map(n => ids.includes(n.id) ? { ...n, is_read: true } : n)
                );
                setUnreadCount(prev => Math.max(0, prev - ids.length));
            } else {
                setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
                setUnreadCount(0);
            }
        } catch { /* ignore */ }
    }, []);

    const removeNotification = useCallback(async (id) => {
        try {
            await deleteNotification(id);
            setNotifications(prev => prev.filter(n => n.id !== id));
            setUnreadCount(prev => {
                const n = notifications.find(x => x.id === id);
                return n && !n.is_read ? Math.max(0, prev - 1) : prev;
            });
        } catch { /* ignore */ }
    }, [notifications]);

    // WebSocket connection with exponential backoff
    const connectWS = useCallback(() => {
        if (!isAuthenticated) return;
        const stored = localStorage.getItem('accessToken');
        if (!stored) return;

        const ws = new WebSocket(`${WS_BASE}/notifications/?token=${stored}`);
        wsRef.current = ws;

        ws.onopen = () => {
            reconnectAttempt.current = 0;
        };

        ws.onmessage = (e) => {
            try {
                const data = JSON.parse(e.data);
                if (data.type === 'unread_count') {
                    setUnreadCount(data.count || 0);
                } else if (data.type === 'notification') {
                    const newNotif = {
                        id: data.id,
                        type: data.notification_type,   // notification_type, not type
                        message: data.message,
                        link: data.link,
                        is_read: false,
                        created_at: data.created_at,
                        sender_name: data.sender_name,
                        sender_photo: data.sender_photo,
                    };
                    setNotifications(prev => [newNotif, ...prev]);
                    setUnreadCount(prev => prev + 1);
                    toast.info(data.message, { position: 'bottom-right', autoClose: 4000 });
                }
            } catch { /* ignore bad frames */ }
        };

        ws.onclose = () => {
            if (!isAuthenticated) return;
            const delay = Math.min(30000, 1000 * 2 ** reconnectAttempt.current);
            reconnectAttempt.current += 1;
            reconnectTimer.current = setTimeout(connectWS, delay);
        };

        ws.onerror = () => {
            ws.close();
        };
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchNotifications();
            connectWS();
        }
        return () => {
            clearTimeout(reconnectTimer.current);
            wsRef.current?.close();
        };
    }, [isAuthenticated]);

    const value = {
        notifications,
        unreadCount,
        loading,
        fetchNotifications,
        markRead,
        removeNotification,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};
