import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import { Hydrant } from '../data/hydrantSchema';
interface Props {
    currentRow?: Hydrant;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
export default function HydrantActionDialogs({ onOpenChange, open, currentRow }: Props) {
    const isEdit = !!currentRow;
    const {
        data,
        setData,
        post,
        put,
        processing,
        reset,
        errors: zodError,
    } = useForm({
        id: currentRow?.id,
        kode_unik: currentRow?.kode_unik || '',
        kode_hydrant: currentRow?.kode_hydrant || '',
        tipe: currentRow?.tipe || ['Indoor', 'Outdoor'][0],
        lokasi: currentRow?.lokasi || '',
    });
    const handleClose = () => {
        reset();
        onOpenChange(false);
    };
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEdit) {
            put(route('hydrant.update', currentRow?.id), {
                onSuccess: () => {
                    toast.success('Success!', { description: 'Data Hydrant berhasil diubah' });
                    setTimeout(() => {
                        handleClose();
                        reset();
                    }, 1000);
                },
                preserveScroll: true,
            });
        } else {
            post(route('hydrant.store'), {
                onSuccess: () => {
                    toast.success('Success!', { description: 'Data Hydrant berhasil ditambah.' });
                    setTimeout(() => {
                        handleClose();
                        reset();
                    }, 1000);
                },
                preserveScroll: true,
            });
        }
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="text-left">
                    <DialogTitle>{isEdit ? 'Edit Hydrant' : 'Tambah Hydrant Baru'}</DialogTitle>
                </DialogHeader>
                <div>
                    <form onSubmit={onSubmit} className="space-y-4 p-0.5">
                        <div className="grid gap-2">
                            <Label htmlFor="kode_unik">Kode Unik</Label>
                            <Input id="kode_unik" value={data.kode_unik} onChange={(e) => setData('kode_unik', e.target.value)} />
                            {zodError.kode_unik && <p className="text-xs text-red-500">{zodError.kode_unik}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="kode_hydrant">Kode Hydrant</Label>
                            <Input id="kode_hydrant" value={data.kode_hydrant} onChange={(e) => setData('kode_hydrant', e.target.value)} />
                            {zodError.kode_hydrant && <p className="text-xs text-red-500">{zodError.kode_hydrant}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="tipe">Tipe</Label>
                            <Select
                                value={data.tipe}
                                onValueChange={(value) => setData('tipe', value as 'Indoor' | 'Outdoor')}
                                defaultValue={data.tipe}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Tipe Hydrant" />
                                    <SelectContent>
                                        <SelectItem value="Indoor">Indoor</SelectItem>
                                        <SelectItem value="Outdoor">Outdoor</SelectItem>
                                    </SelectContent>
                                </SelectTrigger>
                            </Select>
                            {zodError.tipe && <p className="text-xs text-red-500">{zodError.tipe}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="lokasi">Lokasi</Label>
                            <Input id="lokasi" value={data.lokasi} onChange={(e) => setData('lokasi', e.target.value)} />
                            {zodError.lokasi && <p className="text-xs text-red-500">{zodError.lokasi}</p>}
                        </div>
                        <DialogFooter className="flex items-center justify-between">
                            <Button type="button" variant="destructive" onClick={handleClose}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={processing} className="ml-auto">
                                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                {isEdit ? 'Update Hydrant' : 'Tambah Hydrant'}
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
