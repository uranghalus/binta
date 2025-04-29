import AppSidebar from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SearchProvider } from '@/context/search-contex';
// import { SearchProvider } from '@/context/search-contex';
import { cn } from '@/lib/utils';
import Cookies from 'js-cookie';
import { ReactNode, useEffect, useState } from 'react';
interface AppLayoutProps {
    children: ReactNode;
}
export default function AppLayout({ children }: AppLayoutProps) {
    const [defaultOpen, setDefaultOpen] = useState(true);

    useEffect(() => {
        const sidebarState = Cookies.get('sidebar_state');
        setDefaultOpen(sidebarState !== 'false');
    }, []);
    return (
        <SearchProvider>
            <SidebarProvider defaultOpen={defaultOpen}>
                <AppSidebar />
                <div
                    id="content"
                    className={cn(
                        'ml-auto w-full max-w-full',
                        'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
                        'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
                        'sm:transition-[width] sm:duration-200 sm:ease-linear',
                        'flex h-svh flex-col',
                        'group-data-[scroll-locked=1]/body:h-full',
                        'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh',
                    )}
                >
                    {children}
                </div>
            </SidebarProvider>
        </SearchProvider>
    );
}
