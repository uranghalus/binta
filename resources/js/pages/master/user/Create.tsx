import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { ChevronsUpDownIcon, LoaderIcon } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';
import { Karyawan } from '../karyawan/data/karyawanSchema';

interface Props {
    karyawans: Karyawan[];
}

export default function Create({ karyawans }: Props) {
    const [openKaryawan, setOpenKaryawan] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        karyawan_id: '',
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('pengguna.store'), {
            onSuccess: () => {
                toast.success('User berhasil ditambahkan!', { description: 'Akun pengguna baru berhasil dibuat.' });
                reset();
            },
            preserveScroll: true,
        });
    };

    return (
        <AppLayout title="Tambah User">
            <Head title="Tambah User" />
            <Card>
                <CardHeader>
                    <CardTitle>Tambah User</CardTitle>
                    <CardDescription className="text-muted-foreground">Buat akun user baru dari data karyawan</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-4 p-0.5" id="createUserForm">
                        <div className="grid gap-2">
                            <Label htmlFor="karyawan_id">Pilih Karyawan</Label>
                            <Popover open={openKaryawan} onOpenChange={setOpenKaryawan}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" role="combobox" aria-expanded={openKaryawan} className="w-full justify-between">
                                        {data.karyawan_id
                                            ? karyawans.find((k) => k.id_karyawan === data.karyawan_id)?.nama +
                                              ' (' +
                                              (karyawans.find((k) => k.id_karyawan === data.karyawan_id)?.jabatan?.nama_jabatan ?? '-') +
                                              ')'
                                            : 'Pilih Karyawan'}
                                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="p-0">
                                    <Command>
                                        <CommandInput placeholder="Cari karyawan..." />
                                        <CommandList>
                                            <CommandEmpty>Karyawan tidak ditemukan</CommandEmpty>
                                            <CommandGroup>
                                                {karyawans.map((karyawan) => (
                                                    <CommandItem
                                                        key={karyawan.id_karyawan}
                                                        onSelect={() => {
                                                            setData('karyawan_id', karyawan.id_karyawan ?? '');
                                                            setOpenKaryawan(false);
                                                        }}
                                                    >
                                                        {karyawan.nama} ({karyawan.jabatan?.nama_jabatan ?? '-'})
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            {errors.karyawan_id && <p className="text-xs text-red-500">{errors.karyawan_id}</p>}
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <Button variant="outline" asChild>
                        <a href={route('pengguna.index')}>Kembali</a>
                    </Button>
                    <Button type="submit" form="createUserForm" disabled={processing}>
                        {processing && <LoaderIcon className="mr-2 animate-spin" />}
                        Simpan
                    </Button>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
