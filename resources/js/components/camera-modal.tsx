// resources/js/Components/CameraModal.tsx
import { useRef } from "react";
import Webcam from "react-webcam";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Ambil Foto {label}</DialogTitle>
        </DialogHeader>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: "environment" }} // kamera belakang
          className="w-full rounded-lg"
        />
        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={capture}>Ambil</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
