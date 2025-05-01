import AppLayout from '@/layouts/app-layout';

import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AppLayout title={'Dashboard'}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-col items-center justify-center">
                <h2 className="text-lg font-semibold">Dashboard Content</h2>
                <p className="text-muted-foreground text-sm">This is where your dashboard content will go.</p>
            </div>
        </AppLayout>
    );
}
