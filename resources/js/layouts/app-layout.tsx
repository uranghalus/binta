import AppSidebar from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SearchProvider } from '@/context/search-contex';
// import { SearchProvider } from '@/context/search-contex';
import { Header } from '@/components/__partials/header';
import { Main } from '@/components/__partials/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import Search from '@/components/search';
import ThemeSwitcher from '@/components/theme-switcher';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import Cookies from 'js-cookie';
import { ReactNode, useEffect, useState } from 'react';
interface AppLayoutProps {
    children: ReactNode;
    title: string;
    description?: string;
}
export default function AppLayout({ children, title, description }: AppLayoutProps) {
    const [defaultOpen, setDefaultOpen] = useState(true);
    const { auth } = usePage<SharedData>().props;

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
                    <Header>
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold">{title}</h1>
                            <p className="text-muted-foreground text-sm">{description}</p>
                        </div>
                        <div className="ml-auto flex items-center space-x-4">
                            <Search />
                            <ThemeSwitcher />
                            <ProfileDropdown user={auth.user} />
                        </div>
                    </Header>
                    <Main>{children}</Main>
                </div>
            </SidebarProvider>
        </SearchProvider>
    );
}
