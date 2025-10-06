
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Aperture, Camera } from "lucide-react";

interface CameraModalProps {
  open: boolean;
  onClose: () => void;
  onCapture: (image: string | File) => void;
  label?: string;
}

export default function CameraModal({ open, onClose, onCapture, label }: CameraModalProps) {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSafari, setIsSafari] = useState(false);

  // Deteksi jika user menggunakan Safari (biasanya iPhone)
  useEffect(() => {
    const ua = navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(ua);
    setIsSafari(isIOS || isSafariBrowser);
  }, []);

  const capture = () => {
    if (webcamRef.current && webcamRef.current.getScreenshot) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        onCapture(imageSrc);
        onClose();
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onCapture(file);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-4">
        <DialogHeader>
          <DialogTitle>Ambil Foto {label}</DialogTitle>
        </DialogHeader>

        <div className="p-3 border rounded-lg border-gray-100 space-y-4">
          {!isSafari ? (
            // Untuk Android / Chrome (gunakan react-webcam)
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "environment" }}
              className="w-full rounded-lg"
            />
          ) : (
            // Untuk iPhone Safari (fallback ke input file)
            <div className="flex flex-col items-center justify-center space-y-3">
              <Camera className="h-12 w-12 text-gray-400" />
              <p className="text-sm text-gray-600 text-center">
                Ambil foto menggunakan kamera perangkat Anda
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                Buka Kamera
              </Button>
            </div>
          )}

          {!isSafari && (
            <DialogFooter className="flex !flex-col items-center space-y-2">
              <Button onClick={capture} className="w-full">
                Ambil <Aperture className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
              >
                Batal
              </Button>
            </DialogFooter>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// This code defines a CameraModal component that allows users to capture photos using their device's camera.