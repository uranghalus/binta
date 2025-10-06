import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import RadioInputWithOther from '@/components/radio-input-with-other';
import { Camera, LoaderIcon, MapPin } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { SecurityData } from '../fire-safety/cekpoint-security/data/SecurityData';
import CameraModal from '@/components/camera-modal';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

interface Props {
    cekpointData: SecurityData
}
export default function Cekpoint({ cekpointData }: Props) {


    const { data, setData, post, processing, reset, errors } = useForm({
        kode_cp: String(cekpointData.id), // langsung isi
        nama_petugas: '',
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

    const handleCapture = (field: string, image: string | File) => {
        setData(field as keyof typeof data, image);
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Data', data);

        post(route('inspection.cp-security.store'), {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Data berhasil ditambahkan!', { description: 'Data CP Inspection berhasil ditambah.' });
                reset();
            },
            onError: () => {
                toast.error('Gagal menambahkan data!', { description: 'Data CP Inspection gagal disimpan.' });
            },
            preserveScroll: true,
        });
    };
    return (
        <AppLayout title='Cekpoint Inspeksi'>
            <Head title='Cekpoint Inspeksi' />
            <Card>
                <CardHeader>
                    <CardTitle>Form Inspeksi Cek Point</CardTitle>
                    <CardDescription className="text-muted-foreground">Tambah data inspeksi cek point security</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2" id="inspeksiCpForm">
                        <div className="space-y-4">
                            {/* Pilih Checkpoint */}
                            <div className="space-y-2">
                                <h2 className="font-bold text-gray-800">Data Cekpoint</h2>
                                <Separator />
                                <div className="grid gap-1">
                                    <Label className="text-sm font-bold">Kode Cekpoint</Label>
                                    <div className="text-muted-foreground">{cekpointData.kode_cekpoint}</div>
                                </div>
                                <div className="grid gap-1">
                                    <Label className="text-sm font-bold">Lokasi Cekpoint</Label>
                                    <div className="text-muted-foreground flex items-center gap-1">
                                        <MapPin className="size-4" />
                                        {cekpointData.lokasi}
                                    </div>
                                </div>
                                <div className="grid gap-1">
                                    <Label className="text-sm font-bold">Lantai</Label>
                                    <div className="text-muted-foreground">{cekpointData.lantai}</div>
                                </div>
                                <Input
                                    type="hidden"
                                    name="kode_cp"
                                    value={data.kode_cp}
                                />
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
                                {errors.regu && <p className="text-xs text-red-500">{errors.regu}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="nama_petugas">Nama Petugas</Label>
                                <input
                                    type="text"
                                    name="nama_petugas"
                                    id="nama_petugas"
                                    value={data.nama_petugas}
                                    onChange={(e) => setData('nama_petugas', e.target.value)}
                                    className="w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                                    placeholder="Masukkan nama petugas"
                                />
                                {errors.nama_petugas && <p className="text-xs text-red-500">{errors.nama_petugas}</p>}
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
                                errors={errors}   // <<<<< tambahkan ini
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
                                errors={errors}   // <<<<< tambahkan ini
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
                                errors={errors}   // <<<<< tambahkan ini
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
                                errors={errors}   // <<<<< tambahkan ini
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
                                errors={errors}   // <<<<< tambahkan ini
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
                                errors={errors}   // <<<<< tambahkan ini
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
                                errors={errors}   // <<<<< tambahkan ini
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
    )
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
    errors
}: {
    label: string;
    field: string;
    fotoField: string;
    value?: string;
    fotoValue?: string;
    setData: (field: string, value: any) => void;
    onOpen: () => void;
    options: string[];
    errors: Record<string, string>;   // <<<<< tambahkan
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
            {errors[field] && <p className="text-xs text-red-500">{errors[field]}</p>}
            <div className="flex items-center gap-2">
                <Button type="button" variant="outline" onClick={onOpen}>
                    Ambil Foto <Camera className="ml-1 h-4 w-4" />
                </Button>
                {fotoValue && (
                    <img
                        src={typeof fotoValue === 'string' ? fotoValue : URL.createObjectURL(fotoValue)}
                        alt={label}
                        className="w-20 h-20 object-cover rounded"
                    />
                )}
            </div>
            <input type="hidden" name={fotoField} value={fotoValue ?? ""} />
        </div>
    );
}