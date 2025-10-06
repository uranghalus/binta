import { Button } from '@/components/ui/button';
import { Aperture, RotateCcw } from 'lucide-react';
import { useRef, useState } from 'react';
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

    const isIOS = () =>
        /iPhone|iPad|iPod/i.test(navigator.userAgent) &&
        /Safari/i.test(navigator.userAgent);

    // Konversi base64 ke File
    const base64ToFile = (base64: string, filename: string) => {
        const arr = base64.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) u8arr[n] = bstr.charCodeAt(n);
        return new File([u8arr], filename, { type: mime });
    };

    // Kompres file
    const compressFile = async (file: File): Promise<File> => {
        const options = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 1024,
            useWebWorker: true,
        };
        try {
            return await imageCompression(file, options);
        } catch (err) {
            console.error('Gagal kompres file:', err);
            return file;
        }
    };

    // Capture via webcam (Android/web)
    const handleWebcamCapture = async () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setCaptured(imageSrc);
            setPreviewFile(null);

            // Konversi base64 ke File & kompres
            const file = base64ToFile(imageSrc, 'capture.jpg');
            const compressed = await compressFile(file);

            // Jika mau kirim base64 juga masih bisa:
            const compressedBase64 = await imageCompression.getDataUrlFromFile(compressed);

            onCapture(compressedBase64); // kirim base64 hasil kompres
        }
    };

    // Capture via input file (iPhone)
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const compressed = await compressFile(file);
            setCaptured(URL.createObjectURL(compressed));
            setPreviewFile(compressed);
            onCapture(compressed); // kirim File hasil kompres
        }
    };

    const handleRetake = () => {
        setCaptured(null);
        setPreviewFile(null);
    };

    return (
        <div className="flex w-full flex-col items-center gap-4 rounded-lg border border-gray-200 p-4">
            {!captured ? (
                <>
                    {isIOS() ? (
                        <>
                            <input
                                type="file"
                                accept="image/*"
                                capture="environment"
                                onChange={handleFileChange}
                                className="hidden"
                                id="camera-input"
                            />
                            <label htmlFor="camera-input" className="w-full">
                                <Button className="h-12 w-full space-x-2" type="button">
                                    <Aperture className="size-5" /> Ambil Foto
                                </Button>
                            </label>
                        </>
                    ) : (
                        <>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={videoConstraints}
                                className="rounded-lg border"
                            />
                            <Button
                                onClick={handleWebcamCapture}
                                className="h-12 w-full space-x-2"
                                type="button"
                            >
                                <Aperture className="size-5" /> Ambil Foto
                            </Button>
                        </>
                    )}
                </>
            ) : (
                <>
                    <img src={captured} alt="Captured" className="rounded-md border" />
                    <div className="flex w-full gap-2">
                        <Button
                            variant="outline"
                            onClick={handleRetake}
                            className="h-12 w-full space-x-2"
                            type="button"
                        >
                            <RotateCcw className="size-5" /> Ulangi
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
