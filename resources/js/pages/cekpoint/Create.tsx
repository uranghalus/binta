// resources/js/Pages/cp-inspection/Create.tsx

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import RadioInputWithOther from '@/components/radio-input-with-other';
import { Camera, ChevronsUpDownIcon, LoaderIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { SecurityData } from '../fire-safety/cekpoint-security/data/SecurityData';
import CameraModal from '@/components/camera-modal';



interface Props {
    cekpoints: SecurityData[];
}

export default function Create({ cekpoints }: Props) {
    const [openCP, setOpenCP] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        kode_cp: "",
        regu: "PAGI",
        kondisi: "",
        foto_kondisi: "",
        bocoran: "",
        foto_bocoran: "",
        penerangan_lampu: "",
        foto_penerangan_lampu: "",
        kerusakan_fasum: "",
        foto_kerusakan_fasum: "",
        potensi_bahaya_api: "",
        foto_potensi_bahaya_api: "",
        potensi_bahaya_keorang: "",
        foto_potensi_bahaya_keorang: "",
        orang_mencurigakan: "",
        foto_orang_mencurigakan: "",
        tanggal_patroli: new Date().toISOString().slice(0, 10),
    });

    const [openModal, setOpenModal] = useState<string | null>(null);

    const handleCapture = (field: string, image: string) => {
        setData(field as keyof typeof data, image);
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('inspection.cp-security.store'), {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Data berhasil ditambahkan!', { description: 'Data CP Inspection berhasil ditambah.' });
                reset();
            },
            onError: () => {
                toast.error('Gagal menambahkan data!', { description: 'Data CP Inspection gagal disimpan.' });
                console.log(errors);
            },
            preserveScroll: true,
        });
    };

    return (
        <AppLayout title="Form Inspeksi Cek Point">
            <Head title="Form Inspeksi Cek Point" />
            <Card>
                <CardHeader>
                    <CardTitle>Form Inspeksi Cek Point</CardTitle>
                    <CardDescription className="text-muted-foreground">Tambah data inspeksi cek point security</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2" id="inspeksiCpForm">
                        <div className="space-y-4">
                            {/* Pilih Checkpoint */}
                            <div className="grid gap-2">
                                <Label htmlFor="kode_cp">Check Point</Label>
                                <Popover open={openCP} onOpenChange={setOpenCP}>
                                    <PopoverTrigger asChild className='w-full'>
                                        <Button variant="outline" role="combobox" aria-expanded={openCP} className="w-full justify-between">
                                            {data.kode_cp
                                                ? cekpoints.find((cp) => cp.id === Number(data.kode_cp))?.kode_cekpoint || 'Pilih Cek Point'
                                                : 'Pilih Cek Point'}
                                            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0 w-full" align='end'>
                                        <Command>
                                            <CommandInput placeholder="Cari Cek Point..." />
                                            <CommandList>
                                                <CommandEmpty>Tidak ada data cek point</CommandEmpty>
                                                <CommandGroup>
                                                    {cekpoints.map((cp) => (
                                                        <CommandItem
                                                            key={cp.id}
                                                            onSelect={() => {
                                                                setData('kode_cp', String(cp.id));
                                                                setOpenCP(false);
                                                            }}
                                                        >
                                                            {cp.kode_cekpoint} - {cp.lokasi}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                {errors.kode_cp && <p className="text-xs text-red-500">{errors.kode_cp}</p>}
                            </div>

                            {/* Pilih Regu */}
                            <div className="grid gap-2">
                                <Label htmlFor="regu">Shift</Label>
                                <Select
                                    value={data.regu}
                                    onValueChange={(value) => setData('regu', value as 'PAGI' | 'SIANG' | 'MALAM')}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Regu" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PAGI">PAGI</SelectItem>
                                        <SelectItem value="SIANG">SIANG</SelectItem>
                                        <SelectItem value="MALAM">MALAM</SelectItem>
                                        <SelectItem value="MIDDLE">MIDDLE</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Kondisi */}
                            <InputFotoField
                                label="Kondisi Kebersihan"
                                field="kondisi"
                                fotoField="foto_kondisi"
                                value={data.kondisi}
                                fotoValue={data.foto_kondisi}
                                setData={setData}
                                onOpen={() => setOpenModal("foto_kondisi")}
                                options={["Ya", "Tidak"]}
                            />

                            {/* Bocoran */}
                            <InputFotoField
                                label="Bocoran/Genangan Air"
                                field="bocoran"
                                fotoField="foto_bocoran"
                                value={data.bocoran}
                                fotoValue={data.foto_bocoran}
                                setData={setData}
                                onOpen={() => setOpenModal("foto_bocoran")}
                                options={["Ada", "Tidak Ada"]}
                            />

                            {/* Penerangan Lampu */}
                            <InputFotoField
                                label="Penerangan Lampu"
                                field="penerangan_lampu"
                                fotoField="foto_penerangan_lampu"
                                value={data.penerangan_lampu}
                                fotoValue={data.foto_penerangan_lampu}
                                setData={setData}
                                onOpen={() => setOpenModal("foto_penerangan_lampu")}
                                options={["Hidup", "Mati"]}
                            />

                        </div>
                        <div className="space-y-4">
                            {/* Kerusakan Fasum */}
                            <InputFotoField
                                label="Kerusakan Fasum"
                                field="kerusakan_fasum"
                                fotoField="foto_kerusakan_fasum"
                                value={data.kerusakan_fasum}
                                fotoValue={data.foto_kerusakan_fasum}
                                setData={setData}
                                onOpen={() => setOpenModal("foto_kerusakan_fasum")}
                                options={["Ada", "Tidak Ada"]}
                            />

                            {/* Potensi Bahaya Api */}
                            <InputFotoField
                                label="Potensi Bahaya Api"
                                field="potensi_bahaya_api"
                                fotoField="foto_potensi_bahaya_api"
                                value={data.potensi_bahaya_api}
                                fotoValue={data.foto_potensi_bahaya_api}
                                setData={setData}
                                onOpen={() => setOpenModal("foto_potensi_bahaya_api")}
                                options={["Ada", "Tidak Ada"]}
                            />

                            {/* Potensi Bahaya Keorang */}
                            <InputFotoField
                                label="Potensi Bahaya Keorang"
                                field="potensi_bahaya_keorang"
                                fotoField="foto_potensi_bahaya_keorang"
                                value={data.potensi_bahaya_keorang}
                                fotoValue={data.foto_potensi_bahaya_keorang}
                                setData={setData}
                                onOpen={() => setOpenModal("foto_potensi_bahaya_keorang")}
                                options={["Ada", "Tidak Ada"]}
                            />

                            {/* Orang Mencurigakan */}
                            <InputFotoField
                                label="Orang Mencurigakan"
                                field="orang_mencurigakan"
                                fotoField="foto_orang_mencurigakan"
                                value={data.orang_mencurigakan}
                                fotoValue={data.foto_orang_mencurigakan}
                                setData={setData}
                                onOpen={() => setOpenModal("foto_orang_mencurigakan")}
                                options={["Ada", "Tidak Ada"]}
                            />
                        </div>
                    </form>

                    {openModal && (
                        <CameraModal
                            open={!!openModal}
                            onClose={() => setOpenModal(null)}
                            onCapture={(img) => handleCapture(openModal, img)}
                            label={openModal.replace("foto_", "").replaceAll("_", " ")}
                        />
                    )}
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <Button variant={'outline'} asChild>
                        <Link href={route('inspection.cp-security.index')}>Kembali</Link>
                    </Button>
                    <Button type="submit" form="inspeksiCpForm" disabled={processing}>
                        {processing && <LoaderIcon className="animate-spin" />}
                        Simpan
                    </Button>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
function InputFotoField({
    label,
    field,
    fotoField,
    value,
    fotoValue,
    setData,
    onOpen,
    options,
}: {
    label: string;
    field: string;
    fotoField: string;
    value?: string;
    fotoValue?: string;
    setData: (field: string, value: any) => void;
    onOpen: () => void;
    options: string[];
}) {
    return (
        <div className="space-y-2">
            <RadioInputWithOther
                label={label}
                name={label}
                value={value ?? ""}
                onChange={(val) => setData(field, val)}
                options={options}
            />
            <div className="flex items-center gap-2">
                <Button type="button" variant="outline" onClick={onOpen}>
                    Ambil Foto <Camera className="ml-1 h-4 w-4" />
                </Button>
                {fotoValue && (
                    <img
                        src={fotoValue}
                        alt={label}
                        className="w-20 h-20 object-cover rounded"
                    />
                )}
            </div>
            <input type="hidden" name={fotoField} value={fotoValue ?? ""} />
        </div>
    );
}