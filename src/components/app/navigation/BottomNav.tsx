import { useEffect, useState } from 'react';
import { Home, Ticket, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItem {
    href: string;
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    match: (path: string) => boolean;
}

const menuItems: MenuItem[] = [
    { href: '/', label: 'Home', icon: Home, match: (p) => p === '/' },
    {
        href: '/bookings',
        label: 'My Bookings',
        icon: Ticket,
        match: (p) => p.startsWith('/bookings'),
    },
    {
        href: '/profile',
        label: 'Profile',
        icon: User,
        match: (p) => p.startsWith('/profile'),
    },
];

export default function BottomNav() {
    const [path, setPath] = useState('/');

    useEffect(() => {
        setPath(window.location.pathname);
    }, []);

    return (
        <nav className="fixed inset-x-0 bottom-0 z-50 h-16 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
            <div className="mx-auto max-w-sm h-full">
                <ul className="flex justify-between px-8">
                    {menuItems.map(({ href, label, icon: Icon, match }) => {
                        const active = match(path);
                        return (
                            <li key={href}>
                                <a
                                    href={href}
                                    className={cn(
                                        'flex h-14 w-full flex-col items-center justify-center gap-1 text-xs',
                                        active
                                            ? 'text-primary'
                                            : 'text-muted-foreground hover:text-foreground'
                                    )}
                                >
                                    <Icon
                                        className={cn(
                                            'h-5 w-5',
                                            active && 'stroke-[2.5]'
                                        )}
                                    />
                                    <span className="font-medium">{label}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}
