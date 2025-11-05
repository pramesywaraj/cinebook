import { type ReactNode, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

type Props = {
    title?: string;
    withBack?: boolean;
    backHref?: string;
    rightSlot?: ReactNode; // optional actions on the right
    className?: string;
};

export default function Navbar({
    title,
    withBack = false,
    backHref = '/',
    rightSlot,
    className,
}: Props) {
    const handleBack = useCallback(() => {
        try {
            const ref = document.referrer;
            if (ref && new URL(ref).origin === window.location.origin) {
                window.history.back();
                return;
            }
        } catch {}
        window.location.href = backHref;
    }, [backHref]);

    return (
        <header
            className={cn(
                'sticky top-0 z-50 bg-background border-b border-border',
                className
            )}
        >
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                    {withBack && (
                        <button
                            type="button"
                            aria-label="Go back"
                            onClick={handleBack}
                            className="h-9 w-9 grid place-items-center rounded-md hover:bg-accent"
                        >
                            <ArrowLeft size={20} />
                        </button>
                    )}
                    {title ? <h1 className="text-xl">{title}</h1> : null}
                </div>

                <div className="flex items-center gap-2">{rightSlot}</div>
            </div>
        </header>
    );
}
