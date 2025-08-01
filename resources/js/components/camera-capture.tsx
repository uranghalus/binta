// resources/js/Components/CameraCapture.tsx

import { Button } from '@/components/ui/button'; // jika pakai ShadCN
import { useRef, useState } from 'react';
import Webcam from 'react-webcam';

interface CameraCaptureProps {
    onCapture: (imageSrc: string) => void;
}

const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: 'user',
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
        <div className="flex flex-col items-center gap-4">
            {!captured ? (
                <>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        className="rounded-md border"
                    />
                    <Button onClick={handleCapture}>Ambil Foto</Button>
                </>
            ) : (
                <>
                    <img src={captured} alt="Captured" className="rounded-md border" />
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleRetake}>
                            Ulangi
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
