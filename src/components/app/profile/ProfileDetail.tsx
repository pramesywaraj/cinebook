import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/Button';

// Helper function to get initials from name
function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

export default function ProfileDetail() {
    const { user, logout, isAuthenticated } = useAuth();

    if (!isAuthenticated || !user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <p className="text-sm text-muted-foreground">
                    Please log in to view your profile
                </p>
            </div>
        );
    }

    const initials = getInitials(user.name);

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };

    return (
        <div className="flex flex-col flex-1 gap-6">
            {/* Profile Section */}
            <div className="flex flex-col items-center gap-4 pt-4">
                {/* Profile Avatar */}
                <div className="relative">
                    <div className="w-24 h-24 p-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-semibold">
                        {initials}
                    </div>
                </div>

                {/* User Info */}
                <div className="text-center space-y-1">
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-sm text-muted-foreground">
                        {user.email}
                    </p>
                </div>
            </div>

            {/* User Details Card */}
            <div className="rounded-lg border p-4 space-y-4">
                <div>
                    <p className="text-xs text-muted-foreground mb-1">Name</p>
                    <p className="text-sm font-medium">{user.name}</p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <p className="text-sm font-medium">{user.email}</p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground mb-1">
                        User ID
                    </p>
                    <p className="text-sm font-medium">#{user.id}</p>
                </div>
            </div>

            {/* Logout Button */}
            <div className="mt-auto pt-4">
                <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </div>
        </div>
    );
}
