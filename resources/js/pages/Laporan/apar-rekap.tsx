import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function AparRekap({ rekap, bulan, tahun }) {
    return (
        <AppLayout title="Rekap Laporan Apar">
            <Head title="Rekap Laporan Apar" />
        </AppLayout>
    );
}
