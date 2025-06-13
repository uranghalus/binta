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
import { Head, Link, useForm } from '@inertiajs/react';
import { CalendarIcon, ChevronsUpDownIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { Department } from '../departments/data/departmentSchema';
import { Karyawan, karyawanSchema } from './data/karyawanSchema';

interface Props {
    departments: Department[];
    karyawan: Karyawan;
}

export default function Edit({ departments, karyawan }: Props) {
    // Inisialisasi tanggal dari data karyawan
    const [date, setDate] = useState<Date | undefined>(karyawan.tmk ? new Date(karyawan.tmk) : undefined);
    const [value, setValue] = useState(formatDate(date));
    const [tmkValue, setTmkValue] = useState(toISODate(date));
    const [month, setMonth] = useState<Date | undefined>(date);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const { put, processing, reset, data, setData } = useForm({
        nama: karyawan.nama || '',
        nik: karyawan.nik || '',
        no_ktp: karyawan.no_ktp || '',
        gender: karyawan.gender || 'L',
        department_id: karyawan.department_id || 0,
        jabatan: karyawan.jabatan || '',
        status_karyawan: karyawan.status_karyawan || 'aktif',
        tmk: tmkValue,
        call_sign: karyawan.call_sign || '',
        nama_alias: karyawan.nama_alias || '',
        alamat: karyawan.alamat || '',
        keterangan: karyawan.keterangan || '',
        telp: karyawan.telp || '',
        user_image: undefined as File | undefined, // File baru jika diubah
    });
    const [zodError, setZodError] = useState<Record<string, string>>({});
    const [openDepartment, setOpenDepartment] = useState(false);
    const [open, setOpen] = useState(false);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
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
        put(route('karyawan.update', karyawan.id_karyawan), {
            onSuccess: () => {
                toast.success('Yeay!', { description: 'Data karyawan berhasil diperbarui.' });
                reset();
            },
            onError: (errors) => {
                setZodError(errors);
            },
            preserveScroll: true,
        });
    };

    return (
        <AppLayout title="Edit Karyawan">
            <Head title="Edit Karyawan" />
            <Card>
                <CardHeader>
                    <CardTitle>Edit Karyawan</CardTitle>
                    <CardDescription className="text-muted-foreground">Perbarui Data Karyawan</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2" id="itemForm">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                {/* NIK */}
                                <div className="grid gap-2">
                                    <Label htmlFor="nik">No Induk Karyawan</Label>
                                    <Input id="nik" value={data.nik} onChange={(e) => setData('nik', e.target.value)} />
                                    {zodError.nik && <p className="text-xs text-red-500">{zodError.nik}</p>}
                                </div>
                                {/* KTP */}
                                <div className="grid gap-2">
                                    <Label htmlFor="no_ktp">No. KTP</Label>
                                    <Input id="no_ktp" value={data.no_ktp} onChange={(e) => setData('no_ktp', e.target.value)} />
                                    {zodError.no_ktp && <p className="text-xs text-red-500">{zodError.no_ktp}</p>}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="nama">Nama</Label>
                                <Input id="nama" value={data.nama} onChange={(e) => setData('nama', e.target.value)} />
                                {zodError.nama && <p className="text-xs text-red-500">{zodError.nama}</p>}
                            </div>
                            {/* Gender dan Telpon */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="gender">Jenis Kelamin</Label>
                                    <RadioGroup
                                        className="flex flex-row items-center justify-between p-3"
                                        onValueChange={(val) => setData('gender', val as 'L' | 'P')}
                                        value={data.gender}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="L" id="Laki-Laki" />
                                            <Label htmlFor="Laki-Laki">Laki-Laki</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="P" id="perempuan" />
                                            <Label htmlFor="perempuan">Perempuan</Label>
                                        </div>
                                    </RadioGroup>
                                    {zodError.gender && <p className="text-xs text-red-500">{zodError.gender}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="telp">No. Telp</Label>
                                    <Input id="telp" value={data.telp} onChange={(e) => setData('telp', e.target.value)} />
                                </div>
                            </div>
                            {/* Nama Panggilan dan Alias */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="call_sign">Nama Panggilan</Label>
                                    <Input id="call_sign" value={data.call_sign} onChange={(e) => setData('call_sign', e.target.value)} />
                                    {zodError.call_sign && <p className="text-xs text-red-500">{zodError.call_sign}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="nama_alias">Nama Alias</Label>
                                    <Input id="nama_alias" value={data.nama_alias} onChange={(e) => setData('nama_alias', e.target.value)} />
                                    {zodError.nama_alias && <p className="text-xs text-red-500">{zodError.nama_alias}</p>}
                                </div>
                            </div>
                            {/* Alamat */}
                            <div className="grid gap-2">
                                <Label htmlFor="alamat">Alamat</Label>
                                <Textarea id="alamat" className="h-2/12" value={data.alamat} onChange={(e) => setData('alamat', e.target.value)} />
                                {zodError.alamat && <p className="text-xs text-red-500">{zodError.alamat}</p>}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Department */}
                                <div className="grid gap-2">
                                    <Label htmlFor="department_id">Departemen</Label>
                                    <Popover open={openDepartment} onOpenChange={setOpenDepartment}>
                                        <PopoverTrigger asChild>
                                            <Button variant={'outline'} role="combobox" className="w-full justify-between" aria-expanded={open}>
                                                {data.department_id
                                                    ? departments.find((d: Department) => Number(d.id) === data.department_id)?.name ||
                                                      'Pilih Departemen'
                                                    : 'Pilih Departemen'}
                                                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0">
                                            <Command>
                                                <CommandInput placeholder="Cari departemen..." />
                                                <CommandList>
                                                    <CommandEmpty>Tidak ada departemen yang ditemukan.</CommandEmpty>
                                                    <CommandGroup>
                                                        {departments.map((department) => (
                                                            <CommandItem
                                                                key={department.id}
                                                                onSelect={() => {
                                                                    setData('department_id', Number(department.id));
                                                                    setOpenDepartment(false);
                                                                }}
                                                            >
                                                                {department.name}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    {zodError.department_id && <p className="text-xs text-red-500">{zodError.department_id}</p>}
                                </div>
                                {/* Jabatan */}
                                <div className="grid gap-2">
                                    <Label htmlFor="jabatan">Jabatan</Label>
                                    <Select value={data.jabatan} onValueChange={(value) => setData('jabatan', value)} defaultValue={data.jabatan}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih Jabatan" />
                                            <SelectContent>
                                                <SelectItem value="Manager">Manager</SelectItem>
                                                <SelectItem value="Staff">Staff</SelectItem>
                                                <SelectItem value="Intern">Intern</SelectItem>
                                                <SelectItem value="Lainnya">Lainnya</SelectItem>
                                            </SelectContent>
                                        </SelectTrigger>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {/* Status Karyawan */}
                                <div className="grid gap-2">
                                    <Label htmlFor="status_karyawan">Status Karyawan</Label>
                                    <Select
                                        value={data.status_karyawan}
                                        onValueChange={(val) => setData('status_karyawan', val as 'aktif' | 'tidak_aktif' | 'cuti' | 'resign')}
                                        defaultValue={data.status_karyawan}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih Status Karyawan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="aktif">Aktif</SelectItem>
                                            <SelectItem value="tidak_aktif">Tidak Aktif</SelectItem>
                                            <SelectItem value="cuti">Cuti</SelectItem>
                                            <SelectItem value="resign">Resign</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {zodError.status_karyawan && <p className="text-xs text-red-500">{zodError.status_karyawan}</p>}
                                </div>
                                {/* Tanggal Mulai Kerja */}
                                <div className="grid gap-2">
                                    <Label htmlFor="tmk">Tanggal Mulai Kerja</Label>
                                    <div className="relative flex gap-2">
                                        <Input
                                            id="date"
                                            value={value || ''}
                                            placeholder="June 01, 2025"
                                            className="bg-background pr-10"
                                            onChange={(e) => {
                                                const date = new Date(e.target.value);
                                                if (!isNaN(date.getTime())) {
                                                    setDate(date);
                                                    setMonth(date);
                                                    setValue(formatDate(date));
                                                    const isoDate = toISODate(date);
                                                    setTmkValue(isoDate);
                                                    setData('tmk', isoDate || '');
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'ArrowDown') {
                                                    e.preventDefault();
                                                    setOpen(true);
                                                }
                                            }}
                                        />
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <Button id="date-picker" variant="ghost" className="absolute top-1/2 right-2 size-6 -translate-y-1/2">
                                                    <CalendarIcon className="size-3.5" />
                                                    <span className="sr-only">Select date</span>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto overflow-hidden p-0" align="end" alignOffset={-8} sideOffset={10}>
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    captionLayout="dropdown"
                                                    month={month}
                                                    onMonthChange={setMonth}
                                                    onSelect={(date) => {
                                                        if (date) {
                                                            setDate(date);
                                                            setValue(formatDate(date));
                                                            const isoDate = toISODate(date);
                                                            setTmkValue(isoDate);
                                                            setData('tmk', isoDate || '');
                                                            setOpen(false);
                                                        }
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    {zodError.tmk && <p className="text-xs text-red-500">{zodError.tmk}</p>}
                                </div>
                            </div>
                            {/* User Image */}
                            <div className="grid gap-2">
                                <Label htmlFor="user_image">User Image</Label>
                                <Input
                                    id="user_image"
                                    type="file"
                                    accept="image/jpeg, image/png, image/jpg"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        setData('user_image', file);
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => setPreviewImage(reader.result as string);
                                            reader.readAsDataURL(file);
                                        } else {
                                            setPreviewImage(null);
                                        }
                                    }}
                                />
                                {/* Preview gambar baru jika ada, jika tidak tampilkan gambar lama */}
                                {previewImage ? (
                                    <img src={previewImage} alt="Preview User Image" className="mt-2 h-20 rounded" />
                                ) : (
                                    karyawan.user_image && (
                                        <img src={`/storage/${karyawan.user_image}`} alt="User Image" className="mt-2 h-20 rounded" />
                                    )
                                )}
                                {zodError.user_image && <p className="text-xs text-red-500">{zodError.user_image}</p>}
                            </div>
                            {/* Keterangan */}
                            <div className="grid gap-2">
                                <Label htmlFor="keterangan">Keterangan</Label>
                                <Textarea
                                    id="keterangan"
                                    className="h-2/12"
                                    value={data.keterangan}
                                    onChange={(e) => setData('keterangan', e.target.value)}
                                />
                                {zodError.keterangan && <p className="text-xs text-red-500">{zodError.keterangan}</p>}
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <Button variant={'outline'} asChild>
                        <Link href={route('karyawan.index')}>Kembali</Link>
                    </Button>
                    <Button type="submit" form="itemForm" disabled={processing}>
                        Simpan
                    </Button>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
