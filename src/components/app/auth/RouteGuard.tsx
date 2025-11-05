import { useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { isUnprotectedRoute, isAdminRoute } from '@/lib/constants/routes';

export default function RouteGuard() {
    const { isAuthenticated, isAdmin, isLoading } = useAuth();

    useEffect(() => {
        if (isLoading) return;

        const currentPath = window.location.pathname;

        // Skip protection for unprotected routes
        if (isUnprotectedRoute(currentPath)) {
            if (isAuthenticated) {
                if (isAdmin) {
                    window.location.href = '/admin';
                    return;
                }

                window.location.href = '/';
            }

            return;
        }

        // Handle admin routes
        if (isAdminRoute(currentPath)) {
            if (!isAuthenticated || !isAdmin) {
                window.location.href = '/login';
                return;
            }

            return;
        }

        if (isAdmin && !isAdminRoute(currentPath)) {
            window.location.href = '/admin';
            return;
        }

        if (!isAuthenticated) {
            window.location.href = '/login';
        }
    }, [isAuthenticated, isAdmin, isLoading]);

    return null;
}
