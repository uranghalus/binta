'use client';

import { Head, Link, router, useForm } from '@inertiajs/react';
import { CalendarIcon, ChevronsUpDownIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import AppLayout from '@/layouts/app-layout';
import { formatDate, toISODate } from '@/lib/utils';
import { Karyawan } from '@/types';

interface Props {
    karyawan: Karyawan;
    departments: { id: number; name: string }[];
    jabatans: { id: number; nama_jabatan: string }[];
}

export default function Edit({ karyawan, departments, jabatans }: Props) {
    const [imagePreview, setImagePreview] = useState<string | null>(karyawan.user_image ? `/storage/${karyawan.user_image}` : null);
    const [openDepartment, setOpenDepartment] = useState(false);
    const [date, setDate] = useState<Date | undefined>(karyawan.tmk ? new Date(karyawan.tmk) : undefined);

    const { data, setData, errors, processing } = useForm({
        nik: karyawan.nik || '',
        nama: karyawan.nama || '',
        nama_alias: karyawan.nama_alias || '',
        gender: karyawan.gender || 'L',
        alamat: karyawan.alamat || '',
        no_ktp: karyawan.no_ktp || '',
        telp: karyawan.telp || '',
        department_id: karyawan.department_id || 0,
        jabatan_id: karyawan.jabatan_id || 0,
        call_sign: karyawan.call_sign || '',
        tmk: karyawan.tmk || '',
        status_karyawan: karyawan.status_karyawan || 'aktif',
        keterangan: karyawan.keterangan || '',
        user_image: undefined as File | undefined,
    });

    useEffect(() => {
        if (date) {
            setData('tmk', toISODate(date) ?? '');
        }
    }, [date, setData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                if (value instanceof File) {
                    formData.append(key, value);
                } else {
                    formData.append(key, String(value));
                }
            }
        });
        formData.append('_method', 'put'); // spoofing HTTP PUT

        router.post(route('karyawan.update', karyawan.id_karyawan), formData, {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => toast.success('Berhasil', { description: 'Data berhasil diperbarui.' }),
            onError: () => toast.error('Gagal memperbarui data.'),
        });
    };

    return (
        <AppLayout title="Edit Karyawan">
            <Head title="Edit Karyawan" />
            <Card>
                <CardHeader>
                    <CardTitle>Edit Karyawan</CardTitle>
                    <CardDescription>Perbarui data karyawan</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} id="editForm" className="grid grid-cols-1 gap-6 md:grid-cols-2" encType="multipart/form-data">
                        {/* Kolom Kiri */}
                        <div className="space-y-4">
                            {/* NIK & KTP */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="nik">NIK</Label>
                                    <Input id="nik" value={data.nik} onChange={(e) => setData('nik', e.target.value)} />
                                    {errors.nik && <p className="text-xs text-red-500">{errors.nik}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="no_ktp">No KTP</Label>
                                    <Input id="no_ktp" value={data.no_ktp} onChange={(e) => setData('no_ktp', e.target.value)} />
                                    {errors.no_ktp && <p className="text-xs text-red-500">{errors.no_ktp}</p>}
                                </div>
                            </div>

                            {/* Nama */}
                            <div className="grid gap-2">
                                <Label htmlFor="nama">Nama Lengkap</Label>
                                <Input id="nama" value={data.nama} onChange={(e) => setData('nama', e.target.value)} />
                                {errors.nama && <p className="text-xs text-red-500">{errors.nama}</p>}
                            </div>

                            {/* Gender & Telp */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>Jenis Kelamin</Label>
                                    <RadioGroup value={data.gender} onValueChange={(val) => setData('gender', val as 'L' | 'P')}>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="L" id="L" />
                                                <Label htmlFor="L">Laki-laki</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="P" id="P" />
                                                <Label htmlFor="P">Perempuan</Label>
                                            </div>
                                        </div>
                                    </RadioGroup>
                                    {errors.gender && <p className="text-xs text-red-500">{errors.gender}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="telp">Telp</Label>
                                    <Input id="telp" value={data.telp} onChange={(e) => setData('telp', e.target.value)} />
                                </div>
                            </div>

                            {/* Alias & Call Sign */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="call_sign">Call Sign</Label>
                                    <Input id="call_sign" value={data.call_sign} onChange={(e) => setData('call_sign', e.target.value)} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="nama_alias">Nama Alias</Label>
                                    <Input id="nama_alias" value={data.nama_alias} onChange={(e) => setData('nama_alias', e.target.value)} />
                                </div>
                            </div>

                            {/* Alamat */}
                            <div className="grid gap-2">
                                <Label htmlFor="alamat">Alamat</Label>
                                <Textarea id="alamat" value={data.alamat} onChange={(e) => setData('alamat', e.target.value)} />
                            </div>
                        </div>

                        {/* Kolom Kanan */}
                        <div className="space-y-4">
                            {/* Department & Jabatan */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>Departemen</Label>
                                    <Popover open={openDepartment} onOpenChange={setOpenDepartment}>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" role="combobox" className="justify-between">
                                                {data.department_id
                                                    ? departments.find((d) => String(d.id) === String(data.department_id))?.name
                                                    : 'Pilih Departemen'}
                                                <ChevronsUpDownIcon className="ml-2 h-4 w-4 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0">
                                            <Command>
                                                <CommandInput placeholder="Cari departemen..." />
                                                <CommandList>
                                                    <CommandEmpty>Tidak ditemukan</CommandEmpty>
                                                    <CommandGroup>
                                                        {departments.map((d) => (
                                                            <CommandItem
                                                                key={d.id}
                                                                onSelect={() => {
                                                                    setData('department_id', Number(d.id));
                                                                    setOpenDepartment(false);
                                                                }}
                                                            >
                                                                {d.name}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="jabatan_id">Jabatan</Label>
                                    <Select
                                        value={data.jabatan_id ? String(data.jabatan_id) : ''}
                                        onValueChange={(val) => setData('jabatan_id', Number(val))}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih Jabatan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {jabatans.map((j) => (
                                                <SelectItem key={j.id} value={String(j.id)}>
                                                    {j.nama_jabatan}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Status & TMK */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>Status</Label>
                                    <Select value={data.status_karyawan} onValueChange={(val) => setData('status_karyawan', val)}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="aktif">Aktif</SelectItem>
                                            <SelectItem value="cuti">Cuti</SelectItem>
                                            <SelectItem value="tidak_aktif">Tidak Aktif</SelectItem>
                                            <SelectItem value="resign">Resign</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid gap-2">
                                    <Label>Tanggal Mulai Kerja</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="justify-start text-left font-normal">
                                                {date ? formatDate(date) : <span>Pilih tanggal</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent align="start" className="p-0">
                                            <Calendar mode="single" selected={date} onSelect={setDate} />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>

                            {/* Gambar */}
                            <div className="grid gap-2">
                                <Label htmlFor="user_image">Foto</Label>
                                {imagePreview && <img src={imagePreview} alt="Preview" className="h-24 w-24 rounded border object-cover" />}
                                <Input
                                    id="user_image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setData('user_image', file);
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setImagePreview(reader.result as string);
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                            </div>

                            {/* Keterangan */}
                            <div className="grid gap-2">
                                <Label htmlFor="keterangan">Keterangan</Label>
                                <Textarea id="keterangan" value={data.keterangan} onChange={(e) => setData('keterangan', e.target.value)} />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                        <Link href={route('karyawan.index')}>Kembali</Link>
                    </Button>
                    <Button type="submit" form="editForm" disabled={processing}>
                        Perbarui
                    </Button>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
