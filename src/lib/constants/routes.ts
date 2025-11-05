export const UNPROTECTED_ROUTES = ['/login', '/register'] as const;

export const ADMIN_ROUTES = ['/admin'] as const;

export function isUnprotectedRoute(pathname: string): boolean {
    if (UNPROTECTED_ROUTES.includes(pathname as any)) {
        return true;
    }

    return UNPROTECTED_ROUTES.some((route) => {
        if (route.endsWith('/')) {
            return pathname.startsWith(route);
        }
        return pathname === route || pathname.startsWith(`${route}/`);
    });
}

export function isAdminRoute(pathname: string): boolean {
    return ADMIN_ROUTES.some((route) => pathname.startsWith(route));
}
