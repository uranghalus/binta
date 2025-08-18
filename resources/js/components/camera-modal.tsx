// resources/js/Components/CameraModal.tsx
import { useRef } from "react";
import Webcam from "react-webcam";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Aperture } from "lucide-react";

interface CameraModalProps {
  open: boolean;
  onClose: () => void;
  onCapture: (image: string) => void;
  label?: string;
}

export default function CameraModal({ open, onClose, onCapture, label }: CameraModalProps) {
  const webcamRef = useRef<Webcam>(null);

  const capture = () => {
    if (webcamRef.current && webcamRef.current.getScreenshot) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        onCapture(imageSrc);
        onClose();
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-4">
        <DialogHeader>
          <DialogTitle>Ambil Foto {label}</DialogTitle>
        </DialogHeader>
        <div className="p-3 border rounded-lg border-gray-100 space-y-4">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "environment" }} // kamera belakang
            className="w-full rounded-lg"
          />
          <DialogFooter className="flex !flex-col items-center space-y-2">
            <Button onClick={capture} className="w-full">Ambil <Aperture className="w-4 h-4" /></Button>
            <Button variant="outline" onClick={onClose} className="w-full border-red-200 bg-red-50 text-red-600 hover:bg-red-100  hover:text-red-700">
              Batal
            </Button>
          </DialogFooter>
        </div>

      </DialogContent>
    </Dialog>
  );
}
