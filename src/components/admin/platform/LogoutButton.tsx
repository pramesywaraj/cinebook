import { LogOut } from 'lucide-react';

import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/Button';

export default function LogoutButton() {
    const { logout, user } = useAuth();

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };

    return (
        <div className="mt-auto p-4 border-t border-border">
            <div className="mb-2 px-2">
                <p className="text-sm font-medium">{user?.name || 'Admin'}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleLogout}
            >
                <LogOut className="size-4" />
                Logout
            </Button>
        </div>
    );
}
