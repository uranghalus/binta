import { Button } from '@/components/ui/button';
import { Aperture, RotateCcw } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import imageCompression from 'browser-image-compression';

interface CameraCaptureProps {
    onCapture: (image: string | File) => void;
}

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'environment',
};

export default function CameraCapture({ onCapture }: CameraCaptureProps) {
    const webcamRef = useRef<Webcam>(null);
    const [captured, setCaptured] = useState<string | null>(null);
    const [previewFile, setPreviewFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Deteksi iOS yang lebih akurat
    const isIOS = () => {
        return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform) ||
            (navigator.userAgent.includes("Mac") && "ontouchend" in document);
    };

    // Konversi base64 ke File
    const base64ToFile = (base64: string, filename: string): File => {
        const arr = base64.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
        const bstr = atob(arr[1]);
        const n = bstr.length;
        const u8arr = new Uint8Array(n);
        for (let i = 0; i < n; i++) {
            u8arr[i] = bstr.charCodeAt(i);
        }
        return new File([u8arr], filename, { type: mime });
    };

    // Kompres file dengan error handling yang lebih baik
    const compressFile = async (file: File): Promise<File> => {
        const options = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 1024,
            useWebWorker: true,
            fileType: file.type,
        };

        try {
            // Untuk file yang sudah kecil, skip kompresi
            if (file.size <= 500 * 1024) { // 500KB
                return file;
            }
            return await imageCompression(file, options);
        } catch (err) {
            console.error('Gagal kompres file:', err);
            return file; // Return file asli jika kompresi gagal
        }
    };

    // Capture via webcam (Android/web)
    const handleWebcamCapture = async () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setCaptured(imageSrc);
            setPreviewFile(null);

            try {
                const file = base64ToFile(imageSrc, 'capture.jpg');
                const compressed = await compressFile(file);

                // Konversi ke base64 untuk preview dan kirim
                const reader = new FileReader();
                reader.onload = (e) => {
                    const base64 = e.target?.result as string;
                    setCaptured(base64);
                    onCapture(base64);
                };
                reader.readAsDataURL(compressed);
            } catch (error) {
                console.error('Error processing webcam capture:', error);
                onCapture(imageSrc); // Fallback ke base64 asli
            }
        }
    };

    // Capture via input file (iPhone)
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            // Reset input value untuk memungkinkan memilih file yang sama lagi
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            const compressed = await compressFile(file);

            // Buat URL untuk preview
            const previewUrl = URL.createObjectURL(compressed);
            setCaptured(previewUrl);
            setPreviewFile(compressed);

            // Kirim File object (lebih baik untuk upload)
            onCapture(compressed);

        } catch (error) {
            console.error('Error processing file capture:', error);
            // Fallback: gunakan file asli
            const previewUrl = URL.createObjectURL(file);
            setCaptured(previewUrl);
            setPreviewFile(file);
            onCapture(file);
        }
    };

    const handleRetake = () => {
        // Cleanup URL object untuk menghindari memory leak
        if (captured && captured.startsWith('blob:')) {
            URL.revokeObjectURL(captured);
        }
        setCaptured(null);
        setPreviewFile(null);
    };

    // Cleanup pada unmount
    useEffect(() => {
        return () => {
            if (captured && captured.startsWith('blob:')) {
                URL.revokeObjectURL(captured);
            }
        };
    }, [captured]);

    return (
        <div className="flex w-full flex-col items-center gap-4 rounded-lg border border-gray-200 p-4">
            {!captured ? (
                <>
                    {isIOS() ? (
                        <>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                capture="environment"
                                onChange={handleFileChange}
                                className="hidden"
                                id="camera-input"
                            />
                            <label htmlFor="camera-input" className="w-full">
                                <Button
                                    className="h-12 w-full space-x-2"
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Aperture className="size-5" />
                                    <span>Ambil Foto</span>
                                </Button>
                            </label>
                            <p className="text-sm text-gray-500 text-center">
                                Tekan tombol di atas untuk membuka kamera
                            </p>
                        </>
                    ) : (
                        <>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={videoConstraints}
                                className="rounded-lg border w-full max-w-md"
                                screenshotQuality={0.7}
                            />
                            <Button
                                onClick={handleWebcamCapture}
                                className="h-12 w-full max-w-md space-x-2"
                                type="button"
                            >
                                <Aperture className="size-5" />
                                <span>Ambil Foto</span>
                            </Button>
                        </>
                    )}
                </>
            ) : (
                <>
                    <img
                        src={captured}
                        alt="Captured"
                        className="rounded-md border w-full max-w-md object-contain max-h-64"
                    />
                    <div className="flex w-full max-w-md gap-2">
                        <Button
                            variant="outline"
                            onClick={handleRetake}
                            className="h-12 w-full space-x-2"
                            type="button"
                        >
                            <RotateCcw className="size-5" />
                            <span>Ulangi</span>
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}