import { useState, useCallback } from 'react';
import { registerUser, loginUser } from '@/lib/api/auth';
import type { RegisterFormData, LoginFormData } from '@/lib/schemas/auth';
import type { User } from '@/lib/schemas/user';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

export function useAuth() {
    const [state, setState] = useState<AuthState>(() => {
        if (typeof window === 'undefined') {
            return { user: null, token: null, isAuthenticated: false };
        }

        const token = localStorage.getItem(TOKEN_KEY);
        const userStr = localStorage.getItem(USER_KEY);
        const user = userStr ? JSON.parse(userStr) : null;

        return { user, token, isAuthenticated: !!token && !!user };
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = useCallback(async (data: LoginFormData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await loginUser(data);
            localStorage.setItem(TOKEN_KEY, response.token);
            localStorage.setItem(USER_KEY, JSON.stringify(response.user));
            setState({
                user: response.user,
                token: response.token,
                isAuthenticated: true,
            });
            return response;
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Login failed';
            setError(message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const register = useCallback(async (data: RegisterFormData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await registerUser(data);
            localStorage.setItem(TOKEN_KEY, response.token);
            localStorage.setItem(USER_KEY, JSON.stringify(response.user));
            setState({
                user: response.user,
                token: response.token,
                isAuthenticated: true,
            });

            return response;
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Registration failed';
            setError(message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);

        setState({ user: null, token: null, isAuthenticated: false });
    }, []);

    return {
        ...state,
        isLoading,
        error,
        login,
        register,
        logout,
    };
}
