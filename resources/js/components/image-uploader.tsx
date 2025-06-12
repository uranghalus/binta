// components/ui/image-uploader.tsx
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface ImageUploaderProps {
    initialImage?: string | null;
    onImageChange: (file: File | null) => void;
    label?: string;
    className?: string;
    previewClassName?: string;
}

export function ImageUploader({
    initialImage = null,
    onImageChange,
    label = 'Upload Image',
    className = '',
    previewClassName = 'h-32 w-32 rounded-md object-cover border',
}: ImageUploaderProps) {
    const [preview, setPreview] = useState<string | null>(initialImage || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Update preview when initialImage changes
    useEffect(() => {
        setPreview(initialImage || null);
    }, [initialImage]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            onImageChange(file);
        } else {
            setPreview(null);
            onImageChange(null);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const removeImage = () => {
        setPreview(null);
        onImageChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className={`space-y-2 ${className}`}>
            <Label>{label}</Label>

            <div className="flex items-center gap-4">
                {preview && (
                    <div className="flex flex-col items-center gap-2">
                        <img src={preview} alt="Preview" className={previewClassName} />
                    </div>
                )}

                <div className="flex flex-col gap-2">
                    <Input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

                    <div className="flex gap-2">
                        <Button type="button" variant="outline" onClick={triggerFileInput}>
                            {preview ? 'Ganti Gambar' : 'Pilih Gambar'}
                        </Button>

                        {preview && (
                            <Button type="button" variant="destructive" onClick={removeImage}>
                                Hapus
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
