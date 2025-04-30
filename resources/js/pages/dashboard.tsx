import { Header } from '@/components/__partials/header';
import { Main } from '@/components/__partials/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import Search from '@/components/search';
import ThemeSwitcher from '@/components/theme-switcher';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    return (
        <AppLayout>
            <Head title="Dashboard" />
            <Header>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground text-sm">Welcome to your dashboard</p>
                <div className="ml-auto flex items-center space-x-4">
                    <Search />
                    <ThemeSwitcher />
                    <ProfileDropdown user={auth.user} />
                </div>
            </Header>
            <Main>
                <div className="flex h-full flex-col items-center justify-center">
                    <h2 className="text-lg font-semibold">Dashboard Content</h2>
                    <p className="text-muted-foreground text-sm">This is where your dashboard content will go.</p>
                </div>
            </Main>
        </AppLayout>
    );
}
