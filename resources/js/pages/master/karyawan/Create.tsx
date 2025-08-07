'use client';

import { Button } from '@/components/ui/button';
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
import { Head, Link, useForm } from '@inertiajs/react';
import { CalendarIcon, ChevronsUpDownIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { Department } from '../departments/data/departmentSchema';

interface Props {
    departments: Department[];
    jabatans: { id: number; nama_jabatan: string }[];
}

export default function Create({ departments, jabatans }: Props) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [value, setValue] = useState(formatDate(date));
    const [tmkValue, setTmkValue] = useState(toISODate(date));
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [openDepartment, setOpenDepartment] = useState(false);

    const { post, data, setData, processing, reset, errors } = useForm({
        nik: '',
        nama: '',
        nama_alias: '',
        gender: 'L',
        alamat: '',
        no_ktp: '',
        telp: '',
        department_id: 0,
        jabatan_id: 0,
        jabatan: 'Pilih Status',
        call_sign: '',
        tmk: tmkValue,
        status_karyawan: 'aktif',
        keterangan: '',
        user_image: undefined as File | undefined,
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('karyawan.store'), {
            onSuccess: () => {
                toast.success('Berhasil', { description: 'Data karyawan berhasil disimpan.' });
                reset();
                setImagePreview(null);
            },
            onError: () => toast.error('Gagal menyimpan data.'),
            preserveScroll: true,
        });
    };

    return (
        <AppLayout title="Tambah Karyawan">
            <Head title="Tambah Karyawan" />
            <Card>
                <CardHeader>
                    <CardTitle>Tambah Karyawan</CardTitle>
                    <CardDescription>Form input data karyawan</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} id="karyawanForm" className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="nik">NIK</Label>
                                    <Input id="nik" value={data.nik} onChange={(e) => setData('nik', e.target.value)} maxLength={16} />
                                    {errors.nik && <p className="text-xs text-red-500">{errors.nik}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="no_ktp">No KTP</Label>
                                    <Input id="no_ktp" value={data.no_ktp} onChange={(e) => setData('no_ktp', e.target.value)} maxLength={16} />
                                    {errors.no_ktp && <p className="text-xs text-red-500">{errors.no_ktp}</p>}
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="nama">Nama Lengkap</Label>
                                <Input id="nama" value={data.nama} onChange={(e) => setData('nama', e.target.value)} />
                                {errors.nama && <p className="text-xs text-red-500">{errors.nama}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="gender">Jenis Kelamin</Label>
                                    <RadioGroup value={data.gender} onValueChange={(val) => setData('gender', val)}>
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
                                    <Input id="telp" value={data.telp} onChange={(e) => setData('telp', e.target.value)} maxLength={15} />
                                    {errors.telp && <p className="text-xs text-red-500">{errors.telp}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="call_sign">Nama Panggilan</Label>
                                    <Input id="call_sign" value={data.call_sign} onChange={(e) => setData('call_sign', e.target.value)} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="nama_alias">Nama Alias</Label>
                                    <Input id="nama_alias" value={data.nama_alias} onChange={(e) => setData('nama_alias', e.target.value)} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="alamat">Alamat</Label>
                                <Textarea id="alamat" value={data.alamat} onChange={(e) => setData('alamat', e.target.value)} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="department_id">Departemen</Label>
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
                                    {errors.department_id && <p className="text-xs text-red-500">{errors.department_id}</p>}
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
                                    {errors.jabatan_id && <p className="text-xs text-red-500">{errors.jabatan_id}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="status_karyawan">Status</Label>
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
                                    {errors.status_karyawan && <p className="text-xs text-red-500">{errors.status_karyawan}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="tmk">Tanggal Mulai Kerja</Label>
                                    <div className="relative">
                                        <Input
                                            value={value}
                                            onChange={(e) => {
                                                const dt = new Date(e.target.value);
                                                if (!isNaN(dt.getTime())) {
                                                    setDate(dt);
                                                    setValue(formatDate(dt));
                                                    const iso = toISODate(dt);
                                                    setTmkValue(iso);
                                                    setData('tmk', iso);
                                                }
                                            }}
                                        />
                                        <CalendarIcon className="absolute top-2.5 right-2 h-4 w-4 opacity-50" />
                                    </div>
                                </div>
                            </div>

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
                                {errors.user_image && <p className="text-xs text-red-500">{errors.user_image}</p>}
                            </div>

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
                    <Button type="submit" form="karyawanForm" disabled={processing}>
                        Simpan
                    </Button>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
