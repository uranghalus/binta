'use client';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';

export default function QrScanner() {
    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            'reader',
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
            },
            /* verbose */ false,
        );

        scanner.render(
            (decodedText) => {
                scanner.clear(); // Stop setelah berhasil
                console.log('QR Code scanned:', decodedText);

                // Jika QR berisi URL lengkap:
                if (decodedText.startsWith('http')) {
                    window.location.href = decodedText;
                } else {
                    // Kalau hanya kode, redirect ke route Laravel
                    window.location.href = `/inspection/apar-inspeksi/${decodedText}`;
                }
            },
            (error) => {
                // Tidak masalah, ini hanya error bacaan kecil
                console.warn('Scan error:', error);
            },
        );

        return () => {
            scanner.clear().catch((error) => console.error(error));
        };
    }, []);

    return (
        <AppLayout title="Scan">
            <Head title="Scan" />
            <div className="p-4">
                <h2 className="mb-2 text-lg font-bold">Scan QR Code</h2>
                <div id="reader" className="w-[450px] rounded-md border" />
            </div>
        </AppLayout>
    );
}
