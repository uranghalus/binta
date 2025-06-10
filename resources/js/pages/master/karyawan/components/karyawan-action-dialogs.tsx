import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';
import { Department } from '../../departments/data/departmentSchema';
import { Karyawan, karyawanSchema } from '../data/karyawanSchema';

interface Props {
    currentRow?: Karyawan;
    departments: Department[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function KaryawanActionDialog({ onOpenChange, open, currentRow, departments }: Props) {
    const isEdit = !!currentRow;
    const { data, setData, post, put, processing, reset } = useForm({
        id: currentRow?.id,
        nik: currentRow?.nik || '',
        nama: currentRow?.nama || '',
        gender: currentRow?.gender || '',
        department_id: currentRow?.department_id || '',
        alamat: currentRow?.alamat || '',
        telp: currentRow?.telp || '',
        jabatan: currentRow?.jabatan || '',
        status_karyawan: currentRow?.status_karyawan || '',
    });
    const [zodError, setZodError] = useState<Record<string, string>>({});
    const [step, setStep] = useState(1);
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);
    const handleClose = () => {
        reset();
        setZodError({});
        onOpenChange(false);
    };

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const result = karyawanSchema.safeParse(data);
        if (!result.success) {
            const errors: Record<string, string> = {};
            result.error.errors.forEach((error) => {
                if (error.path[0]) {
                    errors[error.path[0]] = error.message;
                }
            });
            setZodError(errors);
            return;
        }
        if (isEdit) {
            put(route('karyawan.update', currentRow?.id), {
                onSuccess: () => {
                    toast.success('Yeay!', {
                        description: 'Data karyawan berhasil dihapus.',
                    });
                    setTimeout(() => {
                        handleClose();
                    }, 1000);
                },
                preserveScroll: true,
            });
        } else {
            post(route('karyawan.store'), {
                onSuccess: () => {
                    toast.success('Yeay!', {
                        description: 'Data karyawan berhasil dihapus.',
                    });
                    setTimeout(() => {
                        handleClose();
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
                    <DialogTitle>{isEdit ? 'Edit Karyawan' : 'Tambah Karyawan Baru'}</DialogTitle>
                </DialogHeader>
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex gap-2 text-sm">
                            <div className={`font-semibold ${step === 1 ? 'text-primary' : ''}`}>1. Data Utama</div>
                            <div>{'>'}</div>
                            <div className={`font-semibold ${step === 2 ? 'text-primary' : ''}`}>2. Data Tambahan</div>
                        </div>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-4 p-0.5">
                        {step === 1 && (
                            <>
                                {/* Step 1 - Data Utama */}
                                <div className="grid gap-2">
                                    <Label htmlFor="nik">NIK</Label>
                                    <Input id="nik" value={data.nik} onChange={(e) => setData('nik', e.target.value)} />
                                    {zodError.nik && <p className="text-xs text-red-500">{zodError.nik}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="nama">Nama</Label>
                                    <Input id="nama" value={data.nama} onChange={(e) => setData('nama', e.target.value)} />
                                    {zodError.nama && <p className="text-xs text-red-500">{zodError.nama}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    <Select value={data.gender} onValueChange={(val) => setData('gender', val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="L">Laki-laki</SelectItem>
                                            <SelectItem value="P">Perempuan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {zodError.gender && <p className="text-xs text-red-500">{zodError.gender}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="department_id">Departemen</Label>
                                    <Select
                                        value={data.department_id ? data.department_id.toString() : ''}
                                        onValueChange={(val) => setData('department_id', Number(val))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih departemen" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {departments.map((d) => (
                                                <SelectItem key={d.id} value={String(d.id)}>
                                                    {d.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {zodError.department_id && <p className="text-xs text-red-500">{zodError.department_id}</p>}
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                {/* Step 2 - Data Tambahan */}
                                <div className="grid gap-2">
                                    <Label htmlFor="alamat">Alamat</Label>
                                    <Input id="alamat" value={data.alamat} onChange={(e) => setData('alamat', e.target.value)} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="telp">No. Telp</Label>
                                    <Input id="telp" value={data.telp} onChange={(e) => setData('telp', e.target.value)} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="jabatan">Jabatan</Label>
                                    <Input id="jabatan" value={data.jabatan} onChange={(e) => setData('jabatan', e.target.value)} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="status_karyawan">Status Karyawan</Label>
                                    <Input
                                        id="status_karyawan"
                                        value={data.status_karyawan}
                                        onChange={(e) => setData('status_karyawan', e.target.value)}
                                    />
                                </div>
                            </>
                        )}

                        {/* Footer */}
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={handleClose}>
                                Batal
                            </Button>
                            {step > 1 && (
                                <Button type="button" variant="secondary" onClick={prevStep}>
                                    Sebelumnya
                                </Button>
                            )}
                            {step < 2 ? (
                                <Button type="button" onClick={nextStep}>
                                    Selanjutnya
                                </Button>
                            ) : (
                                <Button type="submit" disabled={processing}>
                                    {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                    {isEdit ? 'Update' : 'Simpan'}
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
