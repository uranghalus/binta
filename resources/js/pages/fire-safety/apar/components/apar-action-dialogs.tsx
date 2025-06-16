import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import { Apar } from '../data/aparSchema';

interface Props {
    currentRow?: Apar;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function AparActionDialog({ onOpenChange, open, currentRow }: Props) {
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
        kode_apar: currentRow?.kode_apar || '',
        lokasi: currentRow?.lokasi || '',
        jenis: currentRow?.jenis || ['CO2', 'Powder', 'Foam', 'Air'][0],
        size: currentRow?.size || ['2', '4', '6', '9'][0],
    });
    // const [zodError, setZodError] = useState<Record<string, string>>({});

    const handleClose = () => {
        reset();

        onOpenChange(false);
    };

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEdit) {
            put(route('apar.update', currentRow?.id), {
                onSuccess: () => {
                    toast.success('Success!', { description: 'Data APAR berhasil diubah' });
                    setTimeout(() => {
                        handleClose();
                        reset();
                    }, 1000);
                },
                preserveScroll: true,
            });
        } else {
            post(route('apar.store'), {
                onSuccess: () => {
                    toast.success('Success!', { description: 'Data APAR berhasil ditambah.' });
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
                    <DialogTitle>{isEdit ? 'Edit APAR' : 'Tambah APAR Baru'}</DialogTitle>
                </DialogHeader>
                <div>
                    <form onSubmit={onSubmit} className="space-y-4 p-0.5">
                        <div className="grid gap-2">
                            <Label htmlFor="kode_apar">Kode APAR</Label>
                            <Input id="kode_apar" value={data.kode_apar} onChange={(e) => setData('kode_apar', e.target.value)} />
                            {zodError.kode_apar && <p className="text-xs text-red-500">{zodError.kode_apar}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="lokasi">Lokasi</Label>
                            <Input id="lokasi" value={data.lokasi} onChange={(e) => setData('lokasi', e.target.value)} />
                            {zodError.lokasi && <p className="text-xs text-red-500">{zodError.lokasi}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="jenis">Jenis</Label>
                            <Select value={data.jenis} onValueChange={(value) => setData('jenis', value)} defaultValue={data.jenis}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Jenis Apar" />
                                    <SelectContent>
                                        <SelectItem value="CO2">CO2</SelectItem>
                                        <SelectItem value="Powder">Powder</SelectItem>
                                        <SelectItem value="Foam">Foam</SelectItem>
                                        <SelectItem value="Air">Air</SelectItem>
                                    </SelectContent>
                                </SelectTrigger>
                            </Select>
                            {zodError.jenis && <p className="text-xs text-red-500">{zodError.jenis}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="size">Size</Label>
                            <Select value={data.size.toString()} onValueChange={(value) => setData('size', value)} defaultValue={data.size}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Ukuran Apar" />
                                    <SelectContent>
                                        <SelectItem value="2">2 Kg</SelectItem>
                                        <SelectItem value="4">4 Kg</SelectItem>
                                        <SelectItem value="6">6 Kg</SelectItem>
                                        <SelectItem value="9">9 Kg</SelectItem>
                                    </SelectContent>
                                </SelectTrigger>
                            </Select>

                            {zodError.size && <p className="text-xs text-red-500">{zodError.size}</p>}
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={handleClose}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                {isEdit ? 'Update APAR' : 'Tambah APAR'}
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
