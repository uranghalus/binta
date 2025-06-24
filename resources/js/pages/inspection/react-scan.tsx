import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ReactScan() {
    const [scanned, setScanned] = useState(false);

    const handleScan = (detectedCodes: IDetectedBarcode[]) => {
        if (scanned) return;

        const code = detectedCodes[0]?.rawValue;
        if (!code) return;

        setScanned(true);

        if (code.startsWith('http://') || code.startsWith('https://')) {
            window.location.href = code;
        } else {
            toast.error('Gagal!', { description: 'QR Code Tidak Valid' });
            setTimeout(() => setScanned(false), 2000);
        }
    };

    return (
        <AppLayout title="Scan">
            <Head title="Scan" />
            <div className="flex flex-col items-center p-4">
                <h2 className="mb-4 text-xl font-bold">Scan QR Code</h2>
                <div className="aspect-square w-full max-w-sm overflow-hidden rounded-xl border border-gray-300 shadow-md">
                    <Scanner onScan={handleScan} constraints={{ facingMode: 'environment' }} />
                </div>
            </div>
        </AppLayout>
    );
}
