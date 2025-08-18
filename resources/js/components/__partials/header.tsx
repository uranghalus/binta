import { cn } from '@/lib/utils';
import { Ref, useEffect, useState } from 'react';
import { Separator } from '../ui/separator';
import { SidebarTrigger } from '../ui/sidebar';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
    sticky?: boolean;
    ref?: Ref<HTMLElement>;
}

export const Header = ({ className, sticky, children, ...props }: HeaderProps) => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            setOffset(window.scrollY); // lebih konsisten
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={cn(
                'bg-background flex h-16 items-center gap-3 p-4 sm:gap-4 transition-shadow',
                sticky && 'sticky top-0 z-50 w-full', // pastikan full width
                offset > 10 && sticky ? 'shadow-sm' : 'shadow-none',
                className,
            )}
            {...props}
        >
            <SidebarTrigger variant="outline" className="scale-125 sm:scale-100" />
            <Separator orientation="vertical" className="h-6" />
            {children}
        </header>
    );
};

Header.displayName = 'Header';
