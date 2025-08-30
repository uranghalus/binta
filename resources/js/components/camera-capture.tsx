import { Button } from '@/components/ui/button';
import { Aperture, RotateCcw } from 'lucide-react';
import { useRef, useState } from 'react';
import Webcam from 'react-webcam';

interface CameraCaptureProps {
    onCapture: (file: File) => void;
}

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'environment', // kamera belakang
};

export default function CameraCapture({ onCapture }: CameraCaptureProps) {
    const webcamRef = useRef<Webcam>(null);
    const [captured, setCaptured] = useState<string | null>(null);
    const [previewFile, setPreviewFile] = useState<File | null>(null);

    // cek device iPhone Safari
    const isIOS = () =>
        /iPhone|iPad|iPod/i.test(navigator.userAgent) &&
        /Safari/i.test(navigator.userAgent);

    // --- Mode Webcam (non-iOS) ---
    const handleWebcamCapture = () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            // base64 -> File
            const byteString = atob(imageSrc.split(',')[1]);
            const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const file = new File([ab], `capture-${Date.now()}.jpg`, { type: mimeString });

            setCaptured(imageSrc);
            setPreviewFile(file);
            onCapture(file);
        }
    };

    // --- Mode Input File (iOS Safari) ---
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCaptured(URL.createObjectURL(file));
            setPreviewFile(file);
            onCapture(file);
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
                            <Button onClick={handleWebcamCapture} className="h-12 w-full space-x-2" type="button">
                                <Aperture className="size-5" /> Ambil Foto
                            </Button>
                        </>
                    )}
                </>
            ) : (
                <>
                    <img src={captured} alt="Captured" className="rounded-md border" />
                    <div className="flex w-full gap-2">
                        <Button variant="outline" onClick={handleRetake} className="h-12 w-full space-x-2" type="button">
                            <RotateCcw className="size-5" /> Ulangi
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
