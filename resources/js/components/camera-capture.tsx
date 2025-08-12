import { Button } from '@/components/ui/button';
import { Aperture, RotateCcw } from 'lucide-react';
import { useRef, useState } from 'react';
import Webcam from 'react-webcam';

interface CameraCaptureProps {
    onCapture: (imageSrc: string) => void;
}

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'environment', // kamera belakang
};

export default function CameraCapture({ onCapture }: CameraCaptureProps) {
    const webcamRef = useRef<Webcam>(null);
    const [captured, setCaptured] = useState<string | null>(null);

    const handleCapture = () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setCaptured(imageSrc);
            onCapture(imageSrc);
        }
    };

    const handleRetake = () => {
        setCaptured(null);
    };

    return (
        <div className="flex w-full flex-col items-center gap-4 rounded-lg border border-gray-200 p-4">
            {!captured ? (
                <>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        className="rounded-lg border"
                    />
                    <Button onClick={handleCapture} className="h-12 w-full space-x-2" type="button">
                        <Aperture className="size-5" /> Ambil Foto
                    </Button>
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
